const domains = {
  "images.ctfassets.net": "contentful",
  "cdn.builder.io": "builder.io",
  "images.prismic.io": "imgix",
  "www.datocms-assets.com": "imgix",
  "cdn.sanity.io": "imgix",
  "images.unsplash.com": "imgix",
  "cdn.shopify.com": "shopify",
  "s7d1.scene7.com": "scene7",
  "ip.keycdn.com": "keycdn",
  "assets.caisy.io": "bunny",
  "images.contentstack.io": "contentstack",
  "ucarecdn.com": "uploadcare",
  "imagedelivery.net": "cloudflare_images",
  "wsrv.nl": "wsrv"
};
const subdomains = {
  "imgix.net": "imgix",
  "wp.com": "wordpress",
  "files.wordpress.com": "wordpress",
  "b-cdn.net": "bunny",
  "storyblok.com": "storyblok",
  "kc-usercontent.com": "kontent.ai",
  "cloudinary.com": "cloudinary",
  "kxcdn.com": "keycdn",
  "imgeng.in": "imageengine",
  "imagekit.io": "imagekit",
  "cloudimg.io": "cloudimage",
  "ucarecdn.com": "uploadcare",
  "supabase.co": "supabase",
  "graphassets.com": "hygraph"
};
const paths = {
  "/cdn-cgi/image/": "cloudflare",
  "/cdn-cgi/imagedelivery/": "cloudflare_images",
  "/_next/image": "nextjs",
  "/_vercel/image": "vercel",
  "/is/image": "scene7",
  "/_ipx/": "ipx",
  "/_image": "astro",
  "/.netlify/images": "netlify",
  "/storage/v1/object/public/": "supabase",
  "/storage/v1/render/image/public/": "supabase",
  "/v1/storage/buckets/": "appwrite"
};
function roundIfNumeric(value) {
  if (!value) {
    return value;
  }
  const num = Number(value);
  if (isNaN(num)) {
    return value;
  }
  return Math.round(num);
}
const toRelativeUrl = (url) => {
  const { pathname, search } = url;
  return `${pathname}${search}`;
};
const toCanonicalUrlString = (url) => {
  return url.hostname === "n" ? toRelativeUrl(url) : url.toString();
};
const toUrl = (url, base) => {
  return typeof url === "string" ? new URL(url, "http://n/") : url;
};
const escapeChar = (text) => text === " " ? "+" : "%" + text.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0");
const stripLeadingSlash = (str) => str?.startsWith("/") ? str.slice(1) : str;
const stripTrailingSlash = (str) => str?.endsWith("/") ? str.slice(0, -1) : str;
const addTrailingSlash = (str) => str?.endsWith("/") ? str : `${str}/`;
const createFormatter = (kvSeparator, paramSeparator) => {
  const encodedValueJoiner = escapeChar(kvSeparator);
  const encodedOperationJoiner = escapeChar(paramSeparator);
  function escape(value) {
    return encodeURIComponent(value).replaceAll(kvSeparator, encodedValueJoiner).replaceAll(paramSeparator, encodedOperationJoiner);
  }
  function format(key, value) {
    return `${escape(key)}${kvSeparator}${escape(String(value))}`;
  }
  return (operations) => {
    const ops = Array.isArray(operations) ? operations : Object.entries(operations);
    return ops.flatMap(([key, value]) => {
      if (value === void 0 || value === null) {
        return [];
      }
      if (Array.isArray(value)) {
        return value.map((v) => format(key, v));
      }
      return format(key, value);
    }).join(paramSeparator);
  };
};
const createParser = (kvSeparator, paramSeparator) => {
  if (kvSeparator === "=" && paramSeparator === "&") {
    return queryParser;
  }
  return (url) => {
    const urlString = url.toString();
    return Object.fromEntries(urlString.split(paramSeparator).map((pair) => {
      const [key, value] = pair.split(kvSeparator);
      return [decodeURI(key), decodeURI(value)];
    }));
  };
};
function clampDimensions(operations, maxWidth = 4e3, maxHeight = 4e3) {
  let { width, height } = operations;
  width = Number(width) || void 0;
  height = Number(height) || void 0;
  if (width && width > maxWidth) {
    if (height) {
      height = Math.round(height * maxWidth / width);
    }
    width = maxWidth;
  }
  if (height && height > maxHeight) {
    if (width) {
      width = Math.round(width * maxHeight / height);
    }
    height = maxHeight;
  }
  return { width, height };
}
function extractFromURL(url) {
  const parsedUrl = toUrl(url);
  const operations = Object.fromEntries(parsedUrl.searchParams.entries());
  for (const key in ["width", "height", "quality"]) {
    const value = operations[key];
    if (value) {
      const newVal = Number(value);
      if (!isNaN(newVal)) {
        operations[key] = newVal;
      }
    }
  }
  parsedUrl.search = "";
  return {
    operations,
    src: toCanonicalUrlString(parsedUrl)
  };
}
function normaliseOperations({ keyMap = {}, formatMap = {}, defaults = {} }, operations) {
  if (operations.format && operations.format in formatMap) {
    operations.format = formatMap[operations.format];
  }
  if (operations.width) {
    operations.width = roundIfNumeric(operations.width);
  }
  if (operations.height) {
    operations.height = roundIfNumeric(operations.height);
  }
  for (const k in keyMap) {
    if (!Object.prototype.hasOwnProperty.call(keyMap, k)) {
      continue;
    }
    const key = k;
    if (keyMap[key] === false) {
      delete operations[key];
      continue;
    }
    if (keyMap[key] && operations[key]) {
      operations[keyMap[key]] = operations[key];
      delete operations[key];
    }
  }
  for (const k in defaults) {
    if (!Object.prototype.hasOwnProperty.call(defaults, k)) {
      continue;
    }
    const key = k;
    const value = defaults[key];
    if (!operations[key] && value !== void 0) {
      if (keyMap[key] === false) {
        continue;
      }
      const resolvedKey = keyMap[key] ?? key;
      if (resolvedKey in operations) {
        continue;
      }
      operations[resolvedKey] = value;
    }
  }
  return operations;
}
const invertMap = (map) => Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));
function denormaliseOperations({ keyMap = {}, formatMap = {}, defaults = {} }, operations) {
  const invertedKeyMap = invertMap(keyMap);
  const invertedFormatMap = invertMap(formatMap);
  const ops = normaliseOperations({
    keyMap: invertedKeyMap,
    formatMap: invertedFormatMap,
    defaults
  }, operations);
  if (ops.width) {
    ops.width = roundIfNumeric(ops.width);
  }
  if (ops.height) {
    ops.height = roundIfNumeric(ops.height);
  }
  const q = Number(ops.quality);
  if (!isNaN(q)) {
    ops.quality = q;
  }
  return ops;
}
const queryParser = (url) => {
  const parsedUrl = toUrl(url);
  return Object.fromEntries(parsedUrl.searchParams.entries());
};
function createOperationsGenerator({ kvSeparator = "=", paramSeparator = "&", ...options } = {}) {
  const formatter = createFormatter(kvSeparator, paramSeparator);
  return (operations) => {
    const normalisedOperations = normaliseOperations(options, operations);
    return formatter(normalisedOperations);
  };
}
function createOperationsParser({ kvSeparator = "=", paramSeparator = "&", defaults: _, ...options } = {}) {
  const parser = createParser(kvSeparator, paramSeparator);
  return (url) => {
    const operations = url ? parser(url) : {};
    return denormaliseOperations(options, operations);
  };
}
function createOperationsHandlers(config) {
  const operationsGenerator2 = createOperationsGenerator(config);
  const operationsParser2 = createOperationsParser(config);
  return { operationsGenerator: operationsGenerator2, operationsParser: operationsParser2 };
}
function paramToBoolean(value) {
  if (value === void 0 || value === null) {
    return void 0;
  }
  try {
    return Boolean(JSON.parse(value?.toString()));
  } catch {
    return Boolean(value);
  }
}
const removeUndefined = (obj) => Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== void 0));
function createExtractAndGenerate(extract2, generate2) {
  return ((src, operations, options) => {
    const base = extract2(src, options);
    if (!base) {
      return generate2(src, operations, options);
    }
    return generate2(base.src, {
      ...base.operations,
      ...removeUndefined(operations)
    }, {
      // deno-lint-ignore no-explicit-any
      ...base.options,
      ...options
    });
  });
}
const cdnDomains = new Map(Object.entries(domains));
const cdnSubdomains = Object.entries(subdomains);
const cdnPaths = Object.entries(paths);
function getProviderForUrl(url) {
  return getProviderForUrlByDomain(url) || getProviderForUrlByPath(url);
}
function getProviderForUrlByDomain(url) {
  if (typeof url === "string" && !url.startsWith("https://")) {
    return false;
  }
  const { hostname } = toUrl(url);
  const cdn = cdnDomains.get(hostname);
  if (cdn) {
    return cdn;
  }
  return cdnSubdomains.find(([subdomain]) => hostname.endsWith(subdomain))?.[1] || false;
}
function getProviderForUrlByPath(url) {
  const { pathname } = toUrl(url);
  return cdnPaths.find(([path]) => pathname.startsWith(path))?.[1] || false;
}
const VIEW_URL_SUFFIX = "/view?";
const PREVIEW_URL_SUFFIX = "/preview?";
const { operationsGenerator: operationsGenerator$o, operationsParser: operationsParser$j } = createOperationsHandlers({
  keyMap: {
    format: "output"
  },
  kvSeparator: "=",
  paramSeparator: "&"
});
const generate$q = (src, modifiers) => {
  const url = toUrl(src.toString().replace(VIEW_URL_SUFFIX, PREVIEW_URL_SUFFIX));
  const projectParam = url.searchParams.get("project") ?? "";
  const operations = operationsGenerator$o(modifiers);
  url.search = operations;
  url.searchParams.append("project", projectParam);
  return toCanonicalUrlString(url);
};
const extract$q = (url) => {
  if (getProviderForUrlByPath(url) !== "appwrite") {
    return null;
  }
  const parsedUrl = toUrl(url);
  const operations = operationsParser$j(parsedUrl);
  delete operations.project;
  const projectParam = parsedUrl.searchParams.get("project") ?? "";
  parsedUrl.search = "";
  parsedUrl.searchParams.append("project", projectParam);
  const sourceUrl = parsedUrl.href;
  return {
    src: sourceUrl,
    operations
  };
};
const transform$r = createExtractAndGenerate(extract$q, generate$q);
const DEFAULT_ENDPOINT = "/_image";
const { operationsParser: operationsParser$i, operationsGenerator: operationsGenerator$n } = createOperationsHandlers({
  keyMap: {
    format: "f",
    width: "w",
    height: "h",
    quality: "q"
  },
  defaults: {
    fit: "cover"
  }
});
const generate$p = (src, modifiers, options) => {
  const url = toUrl(`${stripTrailingSlash(options?.baseUrl ?? "")}${options?.endpoint ?? DEFAULT_ENDPOINT}`);
  const operations = operationsGenerator$n(modifiers);
  url.search = operations;
  url.searchParams.set("href", src.toString());
  return toCanonicalUrlString(url);
};
const extract$p = (url) => {
  const parsedUrl = toUrl(url);
  const src = parsedUrl.searchParams.get("href");
  if (!src) {
    return null;
  }
  parsedUrl.searchParams.delete("href");
  const operations = operationsParser$i(parsedUrl);
  return {
    src,
    operations,
    options: { baseUrl: parsedUrl.origin }
  };
};
const transform$q = (src, operations, options = {}) => {
  const url = toUrl(src);
  if (url.pathname !== (options?.endpoint ?? DEFAULT_ENDPOINT)) {
    return generate$p(src, operations, options);
  }
  const base = extract$p(src);
  if (!base) {
    return generate$p(src, operations, options);
  }
  options.baseUrl ??= base.options.baseUrl;
  return generate$p(base.src, {
    ...base.operations,
    ...operations
  }, options);
};
const operationsGenerator$m = createOperationsGenerator({
  defaults: {
    fit: "cover",
    format: "webp",
    sharp: true
  }
});
const extract$o = extractFromURL;
const generate$o = (src, modifiers) => {
  const operations = operationsGenerator$m(modifiers);
  const url = toUrl(src);
  url.search = operations;
  return toCanonicalUrlString(url);
};
const transform$p = createExtractAndGenerate(extract$o, generate$o);
const operationsGenerator$l = createOperationsGenerator({
  keyMap: {
    format: "output"
  }
});
const extract$n = extractFromURL;
const generate$n = (src, modifiers) => {
  const operations = operationsGenerator$l(modifiers);
  const url = toUrl(src);
  url.search = operations;
  return toCanonicalUrlString(url);
};
const extractAndGenerate$1 = createExtractAndGenerate(extract$n, generate$n);
const transform$o = (src, operations) => {
  const { width, height } = operations;
  if (width && height) {
    operations.aspect_ratio ??= `${Math.round(Number(width))}:${Math.round(Number(height))}`;
  }
  return extractAndGenerate$1(src, operations);
};
const { operationsGenerator: operationsGenerator$k, operationsParser: operationsParser$h } = createOperationsHandlers({
  keyMap: {
    "format": "f"
  },
  defaults: {
    format: "auto",
    fit: "cover"
  },
  formatMap: {
    jpg: "jpeg"
  },
  kvSeparator: "=",
  paramSeparator: ","
});
const generate$m = (src, operations, options) => {
  const modifiers = operationsGenerator$k(operations);
  const url = toUrl(options?.domain ? `https://${options.domain}` : "/");
  url.pathname = `/cdn-cgi/image/${modifiers}/${stripLeadingSlash(src.toString())}`;
  return toCanonicalUrlString(url);
};
const extract$m = (url, options) => {
  if (getProviderForUrlByPath(url) !== "cloudflare") {
    return null;
  }
  const parsedUrl = toUrl(url);
  const [, , , modifiers, ...src] = parsedUrl.pathname.split("/");
  const operations = operationsParser$h(modifiers);
  return {
    src: toCanonicalUrlString(toUrl(src.join("/"))),
    operations,
    options: {
      domain: options?.domain ?? (parsedUrl.hostname === "n" ? void 0 : parsedUrl.hostname)
    }
  };
};
const transform$n = createExtractAndGenerate(extract$m, generate$m);
const cloudflareImagesRegex = /https?:\/\/(?<host>[^\/]+)\/cdn-cgi\/imagedelivery\/(?<accountHash>[^\/]+)\/(?<imageId>[^\/]+)\/*(?<transformations>[^\/]+)*$/g;
const imagedeliveryRegex = /https?:\/\/(?<host>imagedelivery.net)\/(?<accountHash>[^\/]+)\/(?<imageId>[^\/]+)\/*(?<transformations>[^\/]+)*$/g;
const { operationsGenerator: operationsGenerator$j, operationsParser: operationsParser$g } = createOperationsHandlers({
  keyMap: {
    width: "w",
    height: "h",
    format: "f"
  },
  defaults: {
    fit: "cover"
  },
  kvSeparator: "=",
  paramSeparator: ","
});
function formatUrl(options, transformations) {
  const { host, accountHash, imageId } = options;
  if (!host || !accountHash || !imageId) {
    throw new Error("Missing required Cloudflare Images options");
  }
  const pathSegments = [
    "https:/",
    ...host === "imagedelivery.net" ? [host] : [host, "cdn-cgi", "imagedelivery"],
    accountHash,
    imageId,
    transformations
  ].filter(Boolean);
  return pathSegments.join("/");
}
const generate$l = (_src, operations, options = {}) => {
  const transformations = operationsGenerator$j(operations);
  const url = formatUrl(options, transformations);
  return toCanonicalUrlString(toUrl(url));
};
const extract$l = (url) => {
  const parsedUrl = toUrl(url);
  const matches = [
    ...parsedUrl.toString().matchAll(cloudflareImagesRegex),
    ...parsedUrl.toString().matchAll(imagedeliveryRegex)
  ];
  if (!matches[0]?.groups) {
    return null;
  }
  const { host, accountHash, imageId, transformations } = matches[0].groups;
  const operations = operationsParser$g(transformations || "");
  const options = { host, accountHash, imageId };
  return {
    src: formatUrl(options),
    operations,
    options
  };
};
const transform$m = (src, operations, options = {}) => {
  const extracted = extract$l(src);
  if (!extracted) {
    throw new Error("Invalid Cloudflare Images URL");
  }
  const newOperations = { ...extracted.operations, ...operations };
  return generate$l(extracted.src, newOperations, {
    ...extracted.options,
    ...options
  });
};
const { operationsGenerator: operationsGenerator$i, operationsParser: operationsParser$f } = createOperationsHandlers({
  keyMap: {
    format: "force_format",
    width: "w",
    height: "h",
    quality: "q"
  },
  defaults: {
    org_if_sml: 1
  }
});
const generate$k = (src, modifiers = {}, { token } = {}) => {
  if (!token) {
    throw new Error("Token is required for Cloudimage URLs" + src);
  }
  let srcString = src.toString();
  srcString = srcString.replace(/^https?:\/\//, "");
  if (srcString.includes("?")) {
    modifiers.ci_url_encoded = 1;
    srcString = encodeURIComponent(srcString);
  }
  const operations = operationsGenerator$i(modifiers);
  const url = new URL(`https://${token}.cloudimg.io/`);
  url.pathname = srcString;
  url.search = operations;
  return url.toString();
};
const extract$k = (src, options = {}) => {
  const url = toUrl(src);
  if (getProviderForUrl(url) !== "cloudimage") {
    return null;
  }
  const operations = operationsParser$f(url);
  let originalSrc = url.pathname;
  if (operations.ci_url_encoded) {
    originalSrc = decodeURIComponent(originalSrc);
    delete operations.ci_url_encoded;
  }
  options.token ??= url.hostname.replace(".cloudimg.io", "");
  return {
    src: `${url.protocol}/${originalSrc}`,
    operations,
    options
  };
};
const transform$l = createExtractAndGenerate(extract$k, generate$k);
const publicRegex = /https?:\/\/(?<host>res\.cloudinary\.com)\/(?<cloudName>[a-zA-Z0-9-]+)\/(?<assetType>image|video|raw)\/(?<deliveryType>upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)\/?(?<signature>s\-\-[a-zA-Z0-9]+\-\-)?\/?(?<transformations>(?:[^_\/]+_[^,\/]+,?)*)?\/(?:(?<version>v\d+)\/)?(?<id>(?:[^\s\/]+\/)*[^\s\/]+(?:\.[a-zA-Z0-9]+)?)$/;
const privateRegex = /https?:\/\/(?<host>(?<cloudName>[a-zA-Z0-9-]+)-res\.cloudinary\.com|[a-zA-Z0-9.-]+)\/(?<assetType>image|video|raw)\/(?<deliveryType>upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)\/?(?<signature>s\-\-[a-zA-Z0-9]+\-\-)?\/?(?<transformations>(?:[^_\/]+_[^,\/]+,?)*)?\/(?:(?<version>v\d+)\/)?(?<id>(?:[^\s\/]+\/)*[^\s\/]+(?:\.[a-zA-Z0-9]+)?)$/;
const { operationsGenerator: operationsGenerator$h, operationsParser: operationsParser$e } = createOperationsHandlers({
  keyMap: {
    width: "w",
    height: "h",
    format: "f",
    quality: "q"
  },
  defaults: {
    format: "auto",
    c: "lfill"
  },
  kvSeparator: "_",
  paramSeparator: ","
});
function formatCloudinaryUrl({ host, cloudName, assetType, deliveryType, signature, transformations, version, id }) {
  const isPublic = host === "res.cloudinary.com";
  return [
    "https:/",
    host,
    isPublic ? cloudName : void 0,
    assetType,
    deliveryType,
    signature,
    transformations,
    version,
    id
  ].filter(Boolean).join("/");
}
function parseCloudinaryUrl(url) {
  let matches = url.toString().match(publicRegex);
  if (!matches?.length) {
    matches = url.toString().match(privateRegex);
  }
  if (!matches?.length) {
    return null;
  }
  return matches.groups || {};
}
const transform$k = (src, operations) => {
  const group = parseCloudinaryUrl(src.toString());
  if (!group) {
    return src.toString();
  }
  const existing = operationsParser$e(group.transformations || "");
  group.transformations = operationsGenerator$h({
    ...existing,
    ...operations
  });
  return formatCloudinaryUrl(group);
};
const operationsGenerator$g = createOperationsGenerator({
  keyMap: {
    format: "fm",
    width: "w",
    height: "h",
    quality: "q"
  },
  defaults: {
    fit: "fill"
  }
});
const generate$j = (src, modifiers) => {
  const operations = operationsGenerator$g(modifiers);
  const url = new URL(src);
  url.search = operations;
  return toCanonicalUrlString(url);
};
const extract$j = extractFromURL;
const extractAndGenerate = createExtractAndGenerate(extract$j, generate$j);
const transform$j = (src, operations) => {
  const { width, height } = clampDimensions(operations, 4e3, 4e3);
  return extractAndGenerate(src, {
    ...operations,
    width,
    height
  });
};
const operationsGenerator$f = createOperationsGenerator({
  defaults: {
    auto: "webp",
    disable: "upscale"
  }
});
const generate$i = (src, operations, { baseURL = "https://images.contentstack.io/" } = {}) => {
  if (operations.width && operations.height) {
    operations.fit ??= "crop";
  }
  const modifiers = operationsGenerator$f(operations);
  const url = toUrl(src);
  if (url.hostname === "n") {
    url.protocol = "https:";
    url.hostname = new URL(baseURL).hostname;
  }
  url.search = modifiers;
  return toCanonicalUrlString(url);
};
const extract$i = (url) => {
  const { src, operations } = extractFromURL(url) ?? {};
  if (!operations || !src) {
    return null;
  }
  const { origin } = toUrl(url);
  return {
    src,
    operations,
    options: {
      baseURL: origin
    }
  };
};
const transform$i = createExtractAndGenerate(extract$i, generate$i);
const operationsGenerator$e = createOperationsGenerator({
  defaults: {
    withoutEnlargement: true,
    fit: "cover"
  }
});
const generate$h = (src, operations) => {
  if (Array.isArray(operations.transforms)) {
    operations.transforms = JSON.stringify(operations.transforms);
  }
  const modifiers = operationsGenerator$e(operations);
  const url = toUrl(src);
  url.search = modifiers;
  return toCanonicalUrlString(url);
};
const extract$h = (url) => {
  const base = extractFromURL(url);
  if (base?.operations?.transforms && typeof base.operations.transforms === "string") {
    try {
      base.operations.transforms = JSON.parse(base.operations.transforms);
    } catch {
      return null;
    }
  }
  return base;
};
const transform$h = createExtractAndGenerate(extract$h, generate$h);
const hygraphRegex = /https:\/\/(?<region>[a-z0-9-]+)\.graphassets\.com\/(?<envId>[a-zA-Z0-9]+)(?:\/(?<transformations>.*?))?\/(?<handle>[a-zA-Z0-9]+)$/;
createOperationsHandlers({
  keyMap: {
    width: "width",
    height: "height",
    format: "format"
  },
  defaults: {
    format: "auto",
    fit: "crop"
  }
});
const extract$g = (url) => {
  const parsedUrl = toUrl(url);
  const matches = parsedUrl.toString().match(hygraphRegex);
  if (!matches?.groups) {
    return null;
  }
  const { region, envId, handle, transformations } = matches.groups;
  const operations = {};
  if (transformations) {
    const parts = transformations.split("/");
    parts.forEach((part) => {
      const [operation, params] = part.split("=");
      if (operation === "resize" && params) {
        params.split(",").forEach((param) => {
          const [key, value] = param.split(":");
          if (key === "width" || key === "height") {
            operations[key] = Number(value);
          } else if (key === "fit") {
            operations.fit = value;
          }
        });
      } else if (operation === "output" && params) {
        params.split(",").forEach((param) => {
          const [key, value] = param.split(":");
          if (key === "format") {
            operations.format = value;
          }
        });
      } else if (operation === "auto_image") {
        operations.format = "auto";
      }
    });
  }
  return {
    src: `https://${region}.graphassets.com/${envId}/${handle}`,
    operations,
    options: {
      region,
      envId,
      handle
    }
  };
};
const generate$g = (src, operations, options = {}) => {
  const extracted = extract$g(src);
  if (!extracted) {
    throw new Error("Invalid Hygraph URL");
  }
  const { region, envId, handle } = {
    ...extracted.options,
    ...options
  };
  const transforms = [];
  if (operations.width || operations.height) {
    const resize = [];
    if (operations.width && operations.height) {
      resize.push("fit:crop");
    } else if (operations.fit) {
      resize.push(`fit:${operations.fit}`);
    }
    if (operations.width)
      resize.push(`width:${operations.width}`);
    if (operations.height)
      resize.push(`height:${operations.height}`);
    if (resize.length)
      transforms.push(`resize=${resize.join(",")}`);
  }
  if (operations.format === "auto" || !operations.format && !extracted.operations.format) {
    transforms.push("auto_image");
  } else if (operations.format) {
    transforms.push(`output=format:${operations.format}`);
  }
  const baseUrl = `https://${region}.graphassets.com/${envId}`;
  const transformPart = transforms.length > 0 ? "/" + transforms.join("/") : "";
  const finalUrl = toUrl(`${baseUrl}${transformPart}/${handle}`);
  return toCanonicalUrlString(finalUrl);
};
const transform$g = createExtractAndGenerate(extract$g, generate$g);
const { operationsGenerator: operationsGenerator$d, operationsParser: operationsParser$d } = createOperationsHandlers({
  keyMap: {
    width: "w",
    height: "h",
    format: "f"
  },
  defaults: {
    m: "cropbox"
  },
  kvSeparator: "_",
  paramSeparator: "/"
});
const generate$f = (src, operations) => {
  const modifiers = operationsGenerator$d(operations);
  const url = toUrl(src);
  url.searchParams.set("imgeng", modifiers);
  return toCanonicalUrlString(url);
};
const extract$f = (url) => {
  const parsedUrl = toUrl(url);
  const imgeng = parsedUrl.searchParams.get("imgeng");
  if (!imgeng) {
    return null;
  }
  const operations = operationsParser$d(imgeng);
  parsedUrl.searchParams.delete("imgeng");
  return {
    src: toCanonicalUrlString(parsedUrl),
    operations
  };
};
const transform$f = createExtractAndGenerate(extract$f, generate$f);
const { operationsGenerator: operationsGenerator$c, operationsParser: operationsParser$c } = createOperationsHandlers({
  keyMap: {
    width: "w",
    height: "h",
    format: "f",
    quality: "q"
  },
  defaults: {
    c: "maintain_ratio",
    fo: "auto"
  },
  kvSeparator: "-",
  paramSeparator: ","
});
const generate$e = (src, operations) => {
  const modifiers = operationsGenerator$c(operations);
  const url = toUrl(src);
  url.searchParams.set("tr", modifiers);
  return toCanonicalUrlString(url);
};
const extract$e = (url) => {
  const parsedUrl = toUrl(url);
  let trPart = null;
  let path = parsedUrl.pathname;
  if (parsedUrl.searchParams.has("tr")) {
    trPart = parsedUrl.searchParams.get("tr");
    parsedUrl.searchParams.delete("tr");
  } else {
    const pathParts = parsedUrl.pathname.split("/");
    const trIndex = pathParts.findIndex((part) => part.startsWith("tr:"));
    if (trIndex !== -1) {
      trPart = pathParts[trIndex].slice(3);
      path = pathParts.slice(0, trIndex).concat(pathParts.slice(trIndex + 1)).join("/");
    }
  }
  if (!trPart) {
    return null;
  }
  parsedUrl.pathname = path;
  const operations = operationsParser$c(trPart);
  return {
    src: toCanonicalUrlString(parsedUrl),
    operations
  };
};
const transform$e = createExtractAndGenerate(extract$e, generate$e);
const { operationsGenerator: operationsGenerator$b, operationsParser: operationsParser$b } = createOperationsHandlers({
  keyMap: {
    format: "fm",
    width: "w",
    height: "h",
    quality: "q"
  },
  defaults: {
    fit: "min",
    auto: "format"
  }
});
const extract$d = (url) => {
  const src = toUrl(url);
  const operations = operationsParser$b(url);
  src.search = "";
  return { src: toCanonicalUrlString(src), operations };
};
const generate$d = (src, operations) => {
  const modifiers = operationsGenerator$b(operations);
  const url = toUrl(src);
  url.search = modifiers;
  if (url.searchParams.has("fm") && url.searchParams.get("auto") === "format") {
    url.searchParams.delete("auto");
  }
  return toCanonicalUrlString(url);
};
const transform$d = createExtractAndGenerate(extract$d, generate$d);
const { operationsGenerator: operationsGenerator$a, operationsParser: operationsParser$a } = createOperationsHandlers({
  keyMap: {
    width: "w",
    height: "h",
    quality: "q",
    format: "f"
  },
  defaults: {
    f: "auto"
  },
  kvSeparator: "_",
  paramSeparator: ","
});
const generate$c = (src, operations, options) => {
  if (operations.width && operations.height) {
    operations.s = `${operations.width}x${operations.height}`;
    delete operations.width;
    delete operations.height;
  }
  const modifiers = operationsGenerator$a(operations);
  const baseURL = options?.baseURL ?? "/_ipx";
  const url = toUrl(baseURL);
  url.pathname = `${stripTrailingSlash(url.pathname)}/${modifiers}/${stripLeadingSlash(src.toString())}`;
  return toCanonicalUrlString(url);
};
const extract$c = (url) => {
  const parsedUrl = toUrl(url);
  const [, baseUrlPart, modifiers, ...srcParts] = parsedUrl.pathname.split("/");
  if (!modifiers || !srcParts.length) {
    return null;
  }
  const operations = operationsParser$a(modifiers);
  if (operations.s) {
    const [width, height] = operations.s.split("x").map(Number);
    operations.width = width;
    operations.height = height;
    delete operations.s;
  }
  return {
    src: "/" + srcParts.join("/"),
    operations,
    options: {
      baseURL: `${parsedUrl.origin}/${baseUrlPart}`
    }
  };
};
const transform$c = (src, operations, options) => {
  const url = toUrl(src);
  const baseURL = options?.baseURL;
  if (baseURL && url.toString().startsWith(baseURL) || url.pathname.startsWith("/_ipx")) {
    const extracted = extract$c(src);
    if (extracted) {
      return generate$c(extracted.src, { ...extracted.operations, ...operations }, { baseURL: extracted.options.baseURL });
    }
  }
  return generate$c(src, operations, { baseURL });
};
const BOOLEAN_PARAMS = [
  "enlarge",
  "flip",
  "flop",
  "negate",
  "normalize",
  "grayscale",
  "removealpha",
  "olrepeat",
  "progressive",
  "adaptive",
  "lossless",
  "nearlossless",
  "metadata"
];
const { operationsGenerator: operationsGenerator$9, operationsParser: operationsParser$9 } = createOperationsHandlers({
  defaults: {
    fit: "cover"
  },
  formatMap: {
    jpg: "jpeg"
  }
});
const generate$b = (src, operations) => {
  const url = toUrl(src);
  for (const key of BOOLEAN_PARAMS) {
    if (operations[key] !== void 0) {
      operations[key] = operations[key] ? 1 : 0;
    }
  }
  url.search = operationsGenerator$9(operations);
  return toCanonicalUrlString(url);
};
const extract$b = (url) => {
  const parsedUrl = toUrl(url);
  const operations = operationsParser$9(parsedUrl);
  for (const key of BOOLEAN_PARAMS) {
    if (operations[key] !== void 0) {
      operations[key] = paramToBoolean(operations[key]);
    }
  }
  parsedUrl.search = "";
  return {
    src: toCanonicalUrlString(parsedUrl),
    operations
  };
};
const transform$b = createExtractAndGenerate(extract$b, generate$b);
const { operationsGenerator: operationsGenerator$8, operationsParser: operationsParser$8 } = createOperationsHandlers({
  formatMap: {
    jpg: "jpeg"
  },
  keyMap: {
    format: "fm",
    width: "w",
    height: "h",
    quality: "q"
  }
});
const generate$a = (src, operations) => {
  const url = toUrl(src);
  if (operations.lossless !== void 0) {
    operations.lossless = operations.lossless ? 1 : 0;
  }
  if (operations.width && operations.height) {
    operations.fit = "crop";
  }
  url.search = operationsGenerator$8(operations);
  return toCanonicalUrlString(url);
};
const extract$a = (url) => {
  const parsedUrl = toUrl(url);
  const operations = operationsParser$8(parsedUrl);
  if (operations.lossless !== void 0) {
    operations.lossless = paramToBoolean(operations.lossless);
  }
  parsedUrl.search = "";
  return {
    src: toCanonicalUrlString(parsedUrl),
    operations
  };
};
const transform$a = createExtractAndGenerate(extract$a, generate$a);
const { operationsGenerator: operationsGenerator$7, operationsParser: operationsParser$7 } = createOperationsHandlers({
  defaults: {
    fit: "cover"
  },
  keyMap: {
    format: "fm",
    width: "w",
    height: "h",
    quality: "q"
  }
});
const generate$9 = (src, operations, options = {}) => {
  const url = toUrl(`${options.baseUrl || ""}/.netlify/images`);
  url.search = operationsGenerator$7(operations);
  url.searchParams.set("url", src.toString());
  return toCanonicalUrlString(url);
};
const extract$9 = (url) => {
  if (getProviderForUrlByPath(url) !== "netlify") {
    return null;
  }
  const parsedUrl = toUrl(url);
  const operations = operationsParser$7(parsedUrl);
  delete operations.url;
  const sourceUrl = parsedUrl.searchParams.get("url") || "";
  parsedUrl.search = "";
  return {
    src: sourceUrl,
    operations,
    options: {
      baseUrl: parsedUrl.hostname === "n" ? void 0 : parsedUrl.origin
    }
  };
};
const transform$9 = createExtractAndGenerate(extract$9, generate$9);
const { operationsGenerator: operationsGenerator$6, operationsParser: operationsParser$6 } = createOperationsHandlers({
  keyMap: {
    width: "w",
    quality: "q",
    height: false,
    format: false
  },
  defaults: {
    q: 75
  }
});
const generate$8 = (src, operations, options = {}) => {
  const url = toUrl(`${options.baseUrl || ""}/${options.prefix || "_vercel"}/image`);
  url.search = operationsGenerator$6(operations);
  url.searchParams.append("url", src.toString());
  return toCanonicalUrlString(url);
};
const extract$8 = (url, options = {}) => {
  if (!["vercel", "nextjs"].includes(getProviderForUrlByPath(url) || "")) {
    return null;
  }
  const parsedUrl = toUrl(url);
  const sourceUrl = parsedUrl.searchParams.get("url") || "";
  parsedUrl.searchParams.delete("url");
  const operations = operationsParser$6(parsedUrl);
  parsedUrl.search = "";
  return {
    src: sourceUrl,
    operations,
    options: {
      baseUrl: options.baseUrl ?? parsedUrl.origin
    }
  };
};
const transform$8 = createExtractAndGenerate(extract$8, generate$8);
const generate$7 = (src, operations, options = {}) => generate$8(src, operations, { ...options, prefix: "_next" });
const extract$7 = (url, options) => extract$8(url, options);
const transform$7 = createExtractAndGenerate(extract$7, generate$7);
const { operationsGenerator: operationsGenerator$5, operationsParser: operationsParser$5 } = createOperationsHandlers({
  keyMap: {
    width: "wid",
    height: "hei",
    quality: "qlt",
    format: "fmt"
  },
  defaults: {
    fit: "crop,0"
  }
});
const BASE = "https://s7d1.scene7.com/is/image/";
const generate$6 = (src, operations) => {
  const url = new URL(src, BASE);
  url.search = operationsGenerator$5(operations);
  return toCanonicalUrlString(url);
};
const extract$6 = (url) => {
  if (getProviderForUrl(url) !== "scene7") {
    return null;
  }
  const parsedUrl = new URL(url, BASE);
  const operations = operationsParser$5(parsedUrl);
  parsedUrl.search = "";
  return {
    src: parsedUrl.toString(),
    operations
  };
};
const transform$6 = createExtractAndGenerate(extract$6, generate$6);
const shopifyRegex = /(.+?)(?:_(?:(pico|icon|thumb|small|compact|medium|large|grande|original|master)|(\d*)x(\d*)))?(?:_crop_([a-z]+))?(\.[a-zA-Z]+)(\.png|\.jpg|\.webp|\.avif)?$/;
const { operationsGenerator: operationsGenerator$4, operationsParser: operationsParser$4 } = createOperationsHandlers({
  keyMap: {
    format: false
  }
});
const generate$5 = (src, operations) => {
  const url = toUrl(src);
  const basePath = url.pathname.replace(shopifyRegex, "$1$6");
  url.pathname = basePath;
  url.search = operationsGenerator$4(operations);
  return toCanonicalUrlString(url);
};
const extract$5 = (url) => {
  const parsedUrl = toUrl(url);
  const match = shopifyRegex.exec(parsedUrl.pathname);
  const operations = operationsParser$4(parsedUrl);
  if (match) {
    const [, , , width, height, crop] = match;
    if (width && height && !operations.width && !operations.height) {
      operations.width = parseInt(width, 10);
      operations.height = parseInt(height, 10);
    }
    if (crop) {
      operations.crop ??= crop;
    }
  }
  const basePath = parsedUrl.pathname.replace(shopifyRegex, "$1$6");
  parsedUrl.pathname = basePath;
  for (const key of ["width", "height", "crop", "pad_color", "format"]) {
    parsedUrl.searchParams.delete(key);
  }
  return {
    src: parsedUrl.toString(),
    operations
  };
};
const transform$5 = createExtractAndGenerate(extract$5, generate$5);
const storyBlokAssets = /(?<id>\/f\/\d+\/\d+x\d+\/\w+\/[^\/]+)\/?(?<modifiers>m\/?(?<crop>\d+x\d+:\d+x\d+)?\/?(?<resize>(?<flipx>\-)?(?<width>\d+)x(?<flipy>\-)?(?<height>\d+))?\/?(filters\:(?<filters>[^\/]+))?)?$/;
const storyBlokImg2 = /^(?<modifiers>\/(?<crop>\d+x\d+:\d+x\d+)?\/?(?<resize>(?<flipx>\-)?(?<width>\d+)x(?<flipy>\-)?(?<height>\d+))?\/?(filters\:(?<filters>[^\/]+))?\/?)?(?<id>\/f\/.+)$/;
const filterSplitterRegex = /:(?![^(]*\))/;
const splitFilters = (filters) => {
  if (!filters) {
    return {};
  }
  return Object.fromEntries(filters.split(filterSplitterRegex).map((filter) => {
    if (!filter)
      return [];
    const [key, value] = filter.split("(");
    return [key, value.replace(")", "")];
  }));
};
const generateFilters = (filters) => {
  if (!filters) {
    return void 0;
  }
  const filterItems = Object.entries(filters).map(([key, value]) => `${key}(${value ?? ""})`);
  if (filterItems.length === 0) {
    return void 0;
  }
  return `filters:${filterItems.join(":")}`;
};
const extract$4 = (url) => {
  const parsedUrl = toUrl(url);
  const regex = parsedUrl.hostname === "img2.storyblok.com" ? storyBlokImg2 : storyBlokAssets;
  const matches = regex.exec(parsedUrl.pathname);
  if (!matches || !matches.groups) {
    return null;
  }
  const { id, crop, width, height, filters, flipx, flipy } = matches.groups;
  const { format, ...filterMap } = splitFilters(filters ?? "");
  if (parsedUrl.hostname === "img2.storyblok.com") {
    parsedUrl.hostname = "a.storyblok.com";
  }
  const operations = Object.fromEntries([
    ["width", Number(width) || void 0],
    ["height", Number(height) || void 0],
    ["format", format],
    ["crop", crop],
    ["filters", filterMap],
    ["flipx", flipx],
    ["flipy", flipy]
  ].filter(([_, value]) => value !== void 0));
  return {
    src: `${parsedUrl.origin}${id}`,
    operations
  };
};
const generate$4 = (src, operations) => {
  const url = toUrl(src);
  const { width = 0, height = 0, format, crop, filters = {}, flipx = "", flipy = "" } = operations;
  const size = `${flipx}${width}x${flipy}${height}`;
  if (format) {
    filters.format = format;
  }
  const parts = [
    url.pathname,
    "m",
    crop,
    size,
    generateFilters(filters)
  ].filter(Boolean);
  url.pathname = parts.join("/");
  return toCanonicalUrlString(url);
};
const transform$4 = createExtractAndGenerate(extract$4, generate$4);
const STORAGE_URL_PREFIX = "/storage/v1/object/public/";
const RENDER_URL_PREFIX = "/storage/v1/render/image/public/";
const isRenderUrl = (url) => url.pathname.startsWith(RENDER_URL_PREFIX);
const { operationsGenerator: operationsGenerator$3, operationsParser: operationsParser$3 } = createOperationsHandlers({});
const generate$3 = (src, operations) => {
  const url = toUrl(src);
  const basePath = url.pathname.replace(RENDER_URL_PREFIX, STORAGE_URL_PREFIX);
  url.pathname = basePath;
  if (operations.format && operations.format !== "origin") {
    delete operations.format;
  }
  url.search = operationsGenerator$3(operations);
  return toCanonicalUrlString(url).replace(STORAGE_URL_PREFIX, RENDER_URL_PREFIX);
};
const extract$3 = (url) => {
  const parsedUrl = toUrl(url);
  const operations = operationsParser$3(parsedUrl);
  const isRender = isRenderUrl(parsedUrl);
  const imagePath = parsedUrl.pathname.replace(RENDER_URL_PREFIX, "").replace(STORAGE_URL_PREFIX, "");
  if (!isRender) {
    return {
      src: toCanonicalUrlString(parsedUrl),
      operations
    };
  }
  return {
    src: `${parsedUrl.origin}${STORAGE_URL_PREFIX}${imagePath}`,
    operations
  };
};
const transform$3 = createExtractAndGenerate(extract$3, generate$3);
const uploadcareRegex = /^https?:\/\/(?<host>[^\/]+)\/(?<uuid>[^\/]+)(?:\/(?<filename>[^\/]+)?)?/;
const { operationsGenerator: operationsGenerator$2, operationsParser: operationsParser$2 } = createOperationsHandlers({
  keyMap: {
    width: false,
    height: false
  },
  defaults: {
    format: "auto"
  },
  kvSeparator: "/",
  paramSeparator: "/-/"
});
const extract$2 = (url) => {
  const parsedUrl = toUrl(url);
  const match = uploadcareRegex.exec(parsedUrl.toString());
  if (!match || !match.groups) {
    return null;
  }
  const { host, uuid } = match.groups;
  const [, ...operationsString] = parsedUrl.pathname.split("/-/");
  const operations = operationsParser$2(operationsString.join("/-/") || "");
  if (operations.resize) {
    const [width, height] = operations.resize.split("x");
    if (width)
      operations.width = parseInt(width);
    if (height)
      operations.height = parseInt(height);
    delete operations.resize;
  }
  return {
    src: `https://${host}/${uuid}/`,
    operations,
    options: { host }
  };
};
const generate$2 = (src, operations, options = {}) => {
  const url = toUrl(src);
  const host = options.host || url.hostname;
  const match = uploadcareRegex.exec(url.toString());
  if (match?.groups) {
    url.pathname = `/${match.groups.uuid}/`;
  }
  operations.resize = operations.resize || `${operations.width ?? ""}x${operations.height ?? ""}`;
  delete operations.width;
  delete operations.height;
  const modifiers = addTrailingSlash(operationsGenerator$2(operations));
  url.hostname = host;
  url.pathname = stripTrailingSlash(url.pathname) + (modifiers ? `/-/${modifiers}` : "") + (match?.groups?.filename ?? "");
  return toCanonicalUrlString(url);
};
const transform$2 = createExtractAndGenerate(extract$2, generate$2);
const { operationsGenerator: operationsGenerator$1, operationsParser: operationsParser$1 } = createOperationsHandlers({
  keyMap: {
    width: "w",
    height: "h"
  },
  defaults: {
    crop: "1"
  }
});
const generate$1 = (src, operations) => {
  const url = toUrl(src);
  const { crop } = operations;
  if (typeof crop !== "undefined" && crop !== "0") {
    operations.crop = crop ? "1" : "0";
  }
  url.search = operationsGenerator$1(operations);
  return toCanonicalUrlString(url);
};
const extract$1 = (url) => {
  const parsedUrl = toUrl(url);
  const operations = operationsParser$1(parsedUrl);
  if (operations.crop !== void 0) {
    operations.crop = operations.crop === "1";
  }
  parsedUrl.search = "";
  return {
    src: toCanonicalUrlString(parsedUrl),
    operations
  };
};
const transform$1 = createExtractAndGenerate(extract$1, generate$1);
const { operationsGenerator, operationsParser } = createOperationsHandlers({
  keyMap: {
    width: "w",
    height: "h",
    format: "output",
    quality: "q"
  },
  defaults: {
    fit: "cover"
  }
});
const extract = (url) => {
  const urlObj = toUrl(url);
  const srcParam = urlObj.searchParams.get("url");
  if (!srcParam) {
    return null;
  }
  let src = srcParam;
  if (!src.startsWith("http://") && !src.startsWith("https://")) {
    src = "https://" + src;
  }
  urlObj.searchParams.delete("url");
  const operations = operationsParser(urlObj);
  return {
    src,
    operations
  };
};
const generate = (src, operations) => {
  const url = new URL("https://wsrv.nl/");
  const srcUrl = typeof src === "string" ? src : src.toString();
  const cleanSrc = srcUrl.replace(/^https?:\/\//, "");
  url.searchParams.set("url", cleanSrc);
  const params = operationsGenerator(operations);
  const searchParams = new URLSearchParams(params);
  for (const [key, value] of searchParams) {
    if (key !== "url") {
      url.searchParams.set(key, value);
    }
  }
  return toCanonicalUrlString(url);
};
const transform = createExtractAndGenerate(extract, generate);
const transformerMap = {
  appwrite: transform$r,
  astro: transform$q,
  "builder.io": transform$p,
  bunny: transform$o,
  cloudflare: transform$n,
  cloudflare_images: transform$m,
  cloudimage: transform$l,
  cloudinary: transform$k,
  contentful: transform$j,
  contentstack: transform$i,
  directus: transform$h,
  hygraph: transform$g,
  imageengine: transform$f,
  imagekit: transform$e,
  imgix: transform$d,
  ipx: transform$c,
  keycdn: transform$b,
  "kontent.ai": transform$a,
  netlify: transform$9,
  nextjs: transform$7,
  scene7: transform$6,
  shopify: transform$5,
  storyblok: transform$4,
  supabase: transform$3,
  uploadcare: transform$2,
  vercel: transform$8,
  wordpress: transform$1,
  wsrv: transform
};
function getTransformerForCdn(cdn) {
  if (!cdn) {
    return void 0;
  }
  return transformerMap[cdn];
}
export {
  getTransformerForCdn as a,
  getProviderForUrl as g
};
