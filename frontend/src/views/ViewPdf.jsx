import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import Rx from "../assets/Rx.png";

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    margin: 20,
    width: "90%",
    height: "90vh", // Adjust the height as needed
    position: "relative",
  },
  header: {
    height: "15vh",
    textAlign: "center",
  },
  medicineSection: {
    height: "85vh",
    marginBottom: 20, // Add bottom margin to create space
  },
  footer: {
    width: "30%",
    height: "10vh",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
};

const ViewPdf = () => {
  return (
    <div style={styles.container}>
      <PDFViewer style={{ width: "100%", height: "100%" }}>
        <Document>
          <Page size="A4">
            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={{ fontSize: 32, marginBottom: 10 }}>
                  One Cainta Hospital
                </Text>
                <Text style={{ fontSize: 12, marginBottom: 10 }}>
                  PhilHealth Accredited Level-1 Hospital
                </Text>
                <Text style={{ fontSize: 12, marginBottom: 10 }}>
                  Municipal Compound, Brgy. Sto. Domingo, Cainta, Rizal
                </Text>
                <Text style={{ fontSize: 12, marginBottom: 10 }}>
                  8696-26-04 to 05
                </Text>
              </View>

              <View style={{ marginTop: 10, borderTop: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginBottom: 10,
                    marginTop: 10,
                  }}
                >
                  <View style={{ width: "70%" }}>
                    <Text style={{ fontSize: 16, marginBottom: 5 }}>
                      Patient Name:{" "}
                    </Text>
                    <Text style={{ fontSize: 16 }}>Sex: </Text>
                  </View>
                  <View style={{ width: "30%" }}>
                    <Text style={{ fontSize: 16, marginBottom: 5 }}>Age: </Text>
                    <Text style={{ fontSize: 16 }}>Date: </Text>
                  </View>
                </View>

                <View style={styles.medicineSection}>
                  <Image style={{ width: 100 }} src={Rx} />

                  <View
                    style={{
                      flexDirection: "row",
                      textAlign: "center",
                      marginLeft: 20,
                    }}
                  >
                    <Text
                      style={{
                        marginBottom: 5,
                        fontSize: 16,
                        fontWeight: "bold",
                        width: 200,
                        wordWrap: "break-word",
                      }}
                    >
                      Medicine
                      Names
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        width: 200,
                        wordWrap: "break-word",
                      }}
                    >
                      Dosage
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        width: 200,
                        wordWrap: "break-word",
                      }}
                    >
                      Quantity
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        width: 200,
                        wordWrap: "break-word",
                      }}
                    >
                      Frequency
                    </Text>
                  </View>
                </View>

                <View style={styles.footer}>
                  <Text
                    style={{
                      marginBottom: 5,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Doctor's Name
                  </Text>
                  <Text style={{ fontSize: 14 }}>Lic No.</Text>
                  <Text style={{ fontSize: 14 }}>PTR No.</Text>
                  <Text style={{ fontSize: 14 }}>S2 No.</Text>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default ViewPdf;
