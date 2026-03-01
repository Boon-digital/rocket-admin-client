import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";

// Register fonts if needed - using default Helvetica for now

interface Stay {
  _id: string;
  checkInDate?: string;
  checkOutDate?: string;
  hotelName?: string;
  hotelId?: string;
  hotelAddress?: string;
  hotelPostcode?: string;
  hotelCity?: string;
  hotelCountry?: string;
  roomType?: string;
  roomNumber?: string;
  roomPrice?: string;
  roomCurrency?: string;
  paymentType?: string;
  taxAmount?: string;
  taxCurrency?: string;
  reference?: string;
  guestIds?: string[];
  guestNames?: string[];
  specialRequests?: string;
  remarks?: string;
  paymentInstructions?: string;
  cancellations?: string;
  confirmationNo?: string;
  hotelConfirmationNo?: string;
}

interface BookingData {
  _id: string;
  confirmationNo?: string;
  confirmationDate?: string;
  travelPeriodStart?: string;
  travelPeriodEnd?: string;
  costCentre?: string;
  notes?: string;
  companyId?: string;
  bookerId?: string;
  stayIds?: string[];
  confirmationEntity?: string;
}

interface ReactPDFDocumentProps {
  bookingData: BookingData;
  stays: Stay[];
  companyData: any;
  bookerData: any;
  userName: string;
  logoUrl: string;
}

// Create styles
const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 120,
    paddingLeft: 40,
    paddingRight: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    objectFit: "contain",
  },
  companyInfo: {
    textAlign: "right",
    fontSize: 10,
  },
  companyName: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
    textAlign: "right",
  },
  companyAddress: {
    marginBottom: 4,
    textAlign: "right",
  },
  confirmationSection: {
    marginTop: 20,
    marginBottom: 8,
  },
  confirmationTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
  },
  detailsRow: {
    flexDirection: "row",
    marginBottom: 6,
    flexWrap: "wrap",
  },
  detailLabel: {
    fontFamily: "Helvetica-Bold",
    width: 150,
  },
  detailValue: {
    flex: 1,
    flexWrap: "wrap",
  },
  staySection: {
    marginTop: 20,
    marginBottom: 10,
    paddingTop: 10,
    flexWrap: "wrap",
  },
  stayHeader: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
  },
  stayDatesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#dcdcdc",
    marginBottom: 5,
  },
  dateSection: {
    width: "50%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  dateSectionDivider: {
    width: 1,
    backgroundColor: "#dcdcdc",
    marginVertical: -8,
  },
  stayDateLabel: {
    fontSize: 12,
  },
  stayDateValue: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#c8c8c8",
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 9,
  },
  footerColumn: {
    flex: 1,
  },
  footerCompanyName: {
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  footerText: {
    marginBottom: 4,
  },
  pageNumber: {
    position: "absolute",
    top: -15,
    right: 0,
    fontSize: 9,
  },
  link: {
    color: "#000000",
    textDecoration: "underline",
  },
  italicText: {
    fontFamily: "Helvetica-Oblique",
  },
  closingSection: {
    marginTop: 20,
  },
  closingText: {
    marginBottom: 8,
  },
});

// Helper functions
const formatDate = (dateString?: string): string => {
  if (!dateString) return "-";
  try {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).replace(/ /g, "/");
  } catch (error) {
    return dateString;
  }
};

const calculateNights = (
  checkInDate?: string,
  checkOutDate?: string
): string => {
  if (!checkInDate || !checkOutDate) return "-";
  try {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays.toString();
  } catch (error) {
    return "-";
  }
};

const formatGuestNames = (stay: Stay): string => {
  if (!stay.guestIds || stay.guestIds.length === 0) {
    return "-";
  }
  if (stay.guestNames && Array.isArray(stay.guestNames) && stay.guestNames.length > 0) {
    return stay.guestNames.join(", ");
  }
  const count = stay.guestIds.length;
  return count === 1 ? "1 guest" : `${count} guests`;
};

const getCostCenterLabel = (code?: string): string => {
  const costCenters: Record<string, string> = {
    CC1: "Cost Centre 1",
    CC2: "Cost Centre 2",
    CC3: "Cost Centre 3",
  };
  return costCenters[code as keyof typeof costCenters] || code || "-";
};

const getBookerName = (bookerData: any, bookerId?: string): string => {
  if (!bookerData) return bookerId || "-";
  const firstName = bookerData.general?.firstName || "";
  const lastName = bookerData.general?.lastName || "";
  if (firstName || lastName) {
    return `${firstName} ${lastName}`.trim();
  }
  return bookerId || "-";
};

// Footer component
const Footer = ({
  confirmationEntity,
}: {
  confirmationEntity?: string;
}) => {
  const selectedEntity = confirmationEntity || "Corporate Meeting Partner B.V.";

  const entityDetails =
    selectedEntity === "Corporate Meeting Partner (UK) Ltd."
      ? {
          name: "Corporate Meeting Partner (UK) Ltd.",
          addressLine1: "59 St. Martin's Lane",
          addressLine2: "London, WC2N 4JS (UK)",
          phone: "Tel. +44 (0)20 4579 0714",
          line1: "Companies House: 15675410",
          tids: "TIDS by IATA: 96172016",
        }
      : {
          name: "Corporate Meeting Partner B.V.",
          addressLine1: "Dorpsstraat 20",
          addressLine2: "2361 BB Warmond (NL)",
          phone: "Tel. +31 (0)85 0030 395",
          line1: "ICC: 77251563",
          tids: "TIDS by IATA: 96075464",
        };

  return (
    <View style={styles.footer} fixed>
      <Text style={styles.pageNumber} wrap={false} render={({ pageNumber, totalPages }) => (
        `Page ${pageNumber} of ${totalPages}`
      )} />
      <View style={styles.footerContent}>
        <View style={styles.footerColumn}>
          <Text style={styles.footerCompanyName} wrap={true}>{entityDetails.name}</Text>
          <Text style={styles.footerText} wrap={true}>{entityDetails.addressLine1}</Text>
          <Text style={styles.footerText} wrap={true}>{entityDetails.addressLine2}</Text>
          <Text style={styles.footerText} wrap={true}>{entityDetails.line1}</Text>
          <Text style={styles.footerText} wrap={true}>{entityDetails.tids}</Text>
        </View>
        <View style={styles.footerColumn}>
          <Text style={styles.footerText} wrap={true}>{entityDetails.phone}</Text>
          <Text style={styles.footerText} wrap={true}>www.corporatemeetingpartner.com</Text>
          <Text style={styles.footerText} wrap={true}>
            reservations@corporatemeetingpartner.com
          </Text>
        </View>
      </View>
    </View>
  );
};

// Main document component
export const ReactPDFDocument = (props: ReactPDFDocumentProps) => {
  const { bookingData, stays, companyData, bookerData, userName, logoUrl } = props;
  const confirmationNumber = bookingData.confirmationNo || bookingData._id;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {logoUrl && <Image style={styles.logo} src={logoUrl} />}
          {companyData && (
            <View style={styles.companyInfo}>
              {companyData.name && (
                <Text style={styles.companyName} wrap={true}>{companyData.name}</Text>
              )}
              {companyData.address && (
                <Text style={styles.companyAddress} wrap={true}>{companyData.address}</Text>
              )}
              {(companyData.postal_code || companyData.city) && (
                <Text style={styles.companyAddress} wrap={true}>
                  {[companyData.postal_code, companyData.city]
                    .filter(Boolean)
                    .join(" ")}
                </Text>
              )}
              {companyData.country && (
                <Text style={styles.companyAddress} wrap={true}>{companyData.country}</Text>
              )}
            </View>
          )}
        </View>

        {/* Confirmation Section */}
        <View style={styles.confirmationSection} wrap={false}>
          <Text style={styles.confirmationTitle} wrap={true}>
            Confirmation {confirmationNumber}
          </Text>
        </View>

        {/* Booking Details */}
        <View style={styles.detailsRow} wrap={false}>
          <Text style={styles.detailLabel}>By order of:</Text>
          <Text style={styles.detailValue} wrap={true}>
            {getBookerName(bookerData, bookingData.bookerId)}
          </Text>
        </View>

        {bookingData.confirmationDate && (
          <View style={styles.detailsRow} wrap={false}>
            <Text style={styles.detailLabel}>Confirmation Date:</Text>
            <Text style={styles.detailValue} wrap={true}>
              {formatDate(bookingData.confirmationDate)}
            </Text>
          </View>
        )}

        <View style={styles.detailsRow} wrap={false}>
          <Text style={styles.detailLabel}>Cost centre:</Text>
          <Text style={styles.detailValue} wrap={true}>
            {getCostCenterLabel(bookingData.costCentre)}
          </Text>
        </View>

        <View style={styles.detailsRow} wrap={false}>
          <Text style={styles.detailLabel}>Travel Period:</Text>
          <Text style={styles.detailValue} wrap={true}>
            {formatDate(bookingData.travelPeriodStart)} to{" "}
            {formatDate(bookingData.travelPeriodEnd)}
          </Text>
        </View>

        <View style={styles.detailsRow} wrap={false}>
          <Text style={styles.detailLabel}>Guarantee:</Text>
          <Text style={styles.detailValue} wrap={true}>
            Reservation is guaranteed for payment and (late) arrival.
          </Text>
        </View>

        <View style={styles.detailsRow} wrap={false}>
          <Text style={styles.detailLabel}>Privacy Policy:</Text>
          <Link
            style={[styles.detailValue, styles.link]}
            src="https://www.corporatemeetingpartner.com/privacy-policy"
          >
            Privacy Policy confirmations
          </Link>
        </View>

        {/* Stays */}
        {stays && stays.length > 0 ? (
          stays.map((stay, index) => {
            const nights = calculateNights(stay.checkInDate, stay.checkOutDate);
            const nightsText =
              parseInt(nights) === 1 ? `${nights} Night` : `${nights} Nights`;
            const guestNamesForTitle = formatGuestNames(stay);

            return (
              <View key={stay._id || index} style={styles.staySection} wrap={false}>
                <Text style={styles.stayHeader} wrap={true}>
                  Stay: {guestNamesForTitle} - {nightsText}
                </Text>

                {/* Check-in / Check-out */}
                <View style={styles.stayDatesContainer}>
                  <View style={styles.dateSection}>
                    <Text style={styles.stayDateLabel}>
                      Check-in:{" "}
                      <Text style={styles.stayDateValue}>
                        {formatDate(stay.checkInDate)}
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.dateSectionDivider} />
                  <View style={styles.dateSection}>
                    <Text style={styles.stayDateLabel}>
                      Check-out:{" "}
                      <Text style={styles.stayDateValue}>
                        {formatDate(stay.checkOutDate)}
                      </Text>
                    </Text>
                  </View>
                </View>

                {/* Hotel Details */}
                <View style={styles.detailsRow} wrap={false}>
                  <Text style={styles.detailLabel}>Hotel:</Text>
                  <Text style={styles.detailValue} wrap={true}>
                    {stay.hotelName || "Unknown hotel"}
                  </Text>
                </View>

                {(stay.hotelAddress ||
                  stay.hotelPostcode ||
                  stay.hotelCity ||
                  stay.hotelCountry) && (
                  <View style={styles.detailsRow} wrap={false}>
                    <Text style={styles.detailLabel}>Hotel address:</Text>
                    <Text style={styles.detailValue} wrap={true}>
                      {[
                        stay.hotelAddress,
                        [stay.hotelPostcode, stay.hotelCity]
                          .filter(Boolean)
                          .join(" "),
                        stay.hotelCountry,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </Text>
                  </View>
                )}

                {stay.hotelConfirmationNo && (
                  <View style={styles.detailsRow} wrap={false}>
                    <Text style={styles.detailLabel}>Hotel Confirmation No.:</Text>
                    <Text style={styles.detailValue} wrap={true}>
                      {stay.hotelConfirmationNo}
                    </Text>
                  </View>
                )}

                <View style={styles.detailsRow} wrap={false}>
                  <Text style={styles.detailLabel}>Room Type:</Text>
                  <Text style={styles.detailValue} wrap={true}>{stay.roomType || "-"}</Text>
                </View>

                <View style={styles.detailsRow} wrap={false}>
                  <Text style={styles.detailLabel}>Room Price:</Text>
                  <Text style={styles.detailValue} wrap={true}>
                    {stay.roomPrice
                      ? `${stay.roomPrice} ${stay.roomCurrency || ""} per night`
                      : "-"}
                  </Text>
                </View>

                {stay.paymentType && (
                  <View style={styles.detailsRow} wrap={false}>
                    <Text style={styles.detailLabel}></Text>
                    <Text style={styles.detailValue} wrap={true}>{stay.paymentType}</Text>
                  </View>
                )}

                {stay.roomPrice && (
                  <View style={styles.detailsRow} wrap={false}>
                    <Text style={styles.detailLabel}></Text>
                    <Text style={[styles.detailValue, styles.italicText]} wrap={true}>
                      Quoted rates reflect average nightly prices and may vary with
                      changes in stay duration or room type
                    </Text>
                  </View>
                )}

                <View style={styles.detailsRow} wrap={false}>
                  <Text style={styles.detailLabel}>Guests:</Text>
                  <Text style={styles.detailValue} wrap={true}>
                    {formatGuestNames(stay)}
                  </Text>
                </View>

                {stay.taxAmount && (
                  <View style={styles.detailsRow} wrap={false}>
                    <Text style={styles.detailLabel}>Total Estimated Tax:</Text>
                    <Text style={styles.detailValue} wrap={true}>
                      {stay.taxAmount} {stay.taxCurrency || ""}
                    </Text>
                  </View>
                )}

                {stay.specialRequests && (
                  <View style={styles.detailsRow} wrap={false}>
                    <Text style={styles.detailLabel}>Special Requests:</Text>
                    <Text style={styles.detailValue} wrap={true}>{stay.specialRequests}</Text>
                  </View>
                )}

                {stay.remarks && (
                  <View style={styles.detailsRow} wrap={false}>
                    <Text style={styles.detailLabel}>Remarks:</Text>
                    <Text style={styles.detailValue} wrap={true}>{stay.remarks}</Text>
                  </View>
                )}

                {stay.paymentInstructions && (
                  <View style={styles.detailsRow} wrap={false}>
                    <Text style={styles.detailLabel}>Payment Instructions:</Text>
                    <Text style={styles.detailValue} wrap={true}>
                      {stay.paymentInstructions}
                    </Text>
                  </View>
                )}

                {stay.cancellations && (
                  <View style={styles.detailsRow} wrap={false}>
                    <Text style={styles.detailLabel}>Cancellation Policy:</Text>
                    <Text style={styles.detailValue} wrap={true}>{stay.cancellations}</Text>
                  </View>
                )}
              </View>
            );
          })
        ) : (
          <View style={styles.staySection}>
            <Text style={styles.italicText}>
              No stays associated with this booking
            </Text>
          </View>
        )}

        {/* Closing */}
        {stays && stays.length > 0 && (
          <View style={styles.closingSection} wrap={false}>
            <Text style={styles.closingText} wrap={true}>
              Thank you for booking with us, we hope you and/or your guest(s) have
              a pleasant stay!
            </Text>
            <Text style={styles.closingText} wrap={true}>With best regards,</Text>
            <Text style={styles.closingText} wrap={true}>{userName}</Text>
          </View>
        )}

        {/* Footer */}
        <Footer
          confirmationEntity={bookingData.confirmationEntity}
        />
      </Page>
    </Document>
  );
};
