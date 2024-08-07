import { Document, Page, Text, View, StyleSheet,Image, Font,pdf } from '@react-pdf/renderer'


const ReactPdfc = ({company,totalProducts,totalEntrieProducts,totalUsers,totalFax,totalConference,portNumbers,specialTerms}) => {

    let monthlyTotal = 0;
    let oneTimeTotal = 0;
    let monthlyEntries = 0;
    let oneTimeEntries = 0;
    let oneTimeTax = 0;

    const TAX_RATE = 0.0775; // 7.75% tax rate

    //console.log(totalProducts)

    //***********ojo este debe venir de la db******//
    const Users = {title:'Nationwide Unlimited Calling: Business VoIP Phone Service',price:24.99,total:totalUsers}
    const Fax = {title:'Nationwide Unlimited EFax service',price:7.99,total:totalFax}
    const Conference = {title:'Conference',price:14.99,total:totalConference}
    const PortNumbers = {title:'Port Numbers',price:2.00,total:portNumbers.length}
    //***********ojo este debe venir de la db******//

    if (totalProducts.length !== 0) {
        monthlyTotal = totalProducts.reduce((acc, product) => product.recurrent ? acc + product.total * product.price : acc, 0)
        oneTimeTotal = totalProducts.reduce((acc, product) => !product.product.recurrent ? acc + product.quantity * product.product.price : acc, 0)
        oneTimeTax = totalProducts.reduce((acc, product) => (!product.product.recurrent && product.taxes) ? acc + product.quantity * product.product.price * TAX_RATE : acc, 0)
      }
    if (totalEntrieProducts.length !== 0) {
        monthlyEntries = totalEntrieProducts.reduce((acc, product) => product.recurrent ? acc + product.quantity * product.price : acc, 0)
        oneTimeEntries = totalEntrieProducts.reduce((acc, product) => !product.recurrent ? acc + product.quantity * product.price : acc, 0)
        oneTimeTax += totalEntrieProducts.reduce((acc, product) => (!product.recurrent && product.taxes) ? acc + Number(product.quantity) * Number(product.price) * TAX_RATE : acc, 0)
      }
    
    if (portNumbers.length > 2) {
      monthlyTotal += monthlyEntries+Users.total*Users.price+Fax.total*Fax.price+Conference.total*Conference.price+((portNumbers.length - 2) * 2.00);
    } else {
      monthlyTotal += monthlyEntries+Users.total*Users.price+Fax.total*Fax.price+Conference.total*Conference.price;
    }

    monthlyTotal += monthlyEntries+Users.total*Users.price+Fax.total*Fax.price+Conference.total*Conference.price;
    oneTimeTotal += oneTimeEntries;
    monthlyTotal = parseFloat(monthlyTotal.toFixed(2));
    oneTimeTotal = parseFloat(oneTimeTotal.toFixed(2));
    //console.log(monthlyEntries)

  return (
    <Document>
        <Page size="letter" style={{padding:'2vw'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between',gap:'16px'}}>
            <View style={{width:'25%'}}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image 
                src='/logo2.png'
                style={{width: '100%', height: 'auto'}} 
              />
            </View>
            <View style={{width:'75%'}}>
              <Text style={{fontSize:'10px',fontWeight:'light'}}>NEVTIS CORP</Text>
              <Text style={{fontSize:'10px',fontWeight:'light'}}>8175 E Kaiser Blvd, Suite 101, Anaheim, CA 92808</Text>
              <Text style={{fontSize:'10px',fontWeight:'light'}}>Mailing: PO BOX 27363, Anaheim, CA 92809</Text>
              <Text style={{fontSize:'10px',fontWeight:'light'}}>Tech Support: 855.442.7107 | www.NEVTIS.com</Text>
            </View>
          </View>
          <Text style={{fontSize:'20px',fontWeight:'bold',textAlign:'center', marginTop:'12px'}}>SERVICE LEVEL AGREEMENT</Text>
          <Text style={{fontSize:'10px',textAlign:'justify',fontWeight:'light',color:'#696969'}}>This Nevtis Corp (here in after “Provider”) Service Level Agreement and Service Order (here in after “Service Level Agreement”) in addition to the Provider’s Terms and Conditions (here in after “Terms and Conditions”) and any additional Service Agreements, constitute the Master Agreement by and between the customer identified below (here in after “Customer”), and the Provider, and is effective as of the date last signed below.</Text>
          <View style={{borderTop: "1pt solid lightgray", marginTop: 6, marginBottom: 6}} />
          <View style={{border:'1pt solid lightgray',paddingHorizontal:'12',paddingVertical:'8',borderRadius:'8px'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View  style={{width:'50%'}}>
                <Text style={{fontSize:'10px',fontWeight:'light',color:'#696969'}}>Account Manger</Text>
                <Text style={{fontSize:'12px',fontWeight:'bold'}}>Andrew Scott</Text>
              </View>
              <View  style={{width:'50%'}}>
                <Text style={{fontSize:'10px',fontWeight:'light',color:'#696969'}}>REP ID</Text>
                <Text style={{fontSize:'12px',fontWeight:'bold'}}>AS 05</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',marginTop:'12px'}}>
              <View  style={{width:'33%'}}>
                <Text style={{fontSize:'10px',fontWeight:'light',color:'#696969'}}>Customer Information:</Text>
                <Text style={{fontSize:'12px',fontWeight:'bold'}}>{company.companyName}</Text>
              </View>
              <View  style={{width:'33%'}}>
                <Text style={{fontSize:'10px',fontWeight:'light',color:'#696969'}}>Federal Tax</Text>
                <Text style={{fontSize:'12px',fontWeight:'bold'}}>N/A</Text>
              </View>
              <View  style={{width:'33%'}}>
                <Text style={{fontSize:'10px',fontWeight:'light',color:'#696969'}}>Phone #</Text>
                <Text style={{fontSize:'12px',fontWeight:'bold'}}>{company.phone}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',marginTop:'12px'}}>
              <View  style={{width:'50%'}}>
                <Text style={{fontSize:'10px',fontWeight:'light',color:'#696969'}}>Authorized Contact:</Text>
                <Text style={{fontSize:'12px',fontWeight:'bold'}}>{`${company.name} ${company.lastname}`}</Text>
              </View>
              <View  style={{width:'50%'}}>
                <Text style={{fontSize:'10px',fontWeight:'light',color:'#696969'}}>Email</Text>
                <Text style={{fontSize:'12px',fontWeight:'bold'}}>{company.email}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',marginTop:'12px'}}>
              <View  style={{width:'80%'}}>
                <Text style={{fontSize:'10px',fontWeight:'light',color:'#696969'}}>Service Address (This address will be sued for E911 Services)</Text>
                <Text style={{fontSize:'12px',fontWeight:'bold'}}>{`${company.address}, ${company.address2},${company.city}, ${company.state},${company.zip}`}</Text>
              </View>
              <View  style={{width:'20%'}}>
                <Text style={{fontSize:'10px',fontWeight:'light',color:'#696969'}}>Site Name</Text>
                <Text style={{fontSize:'12px',fontWeight:'bold'}}>{company.siteAnalysis}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',marginTop:'12px'}}>
              <View  style={{width:'50%'}}>
                <Text style={{fontSize:'10px',fontWeight:'light',color:'#696969'}}>Location Type</Text>
                <Text style={{fontSize:'12px',fontWeight:'bold'}}>{company.locationType}</Text>
              </View>
              <View  style={{width:'50%'}}>
                <Text style={{fontSize:'10px',fontWeight:'light',color:'#696969'}}>Bandwith</Text>
                <Text style={{fontSize:'12px',fontWeight:'bold'}}>{company.bandwith}</Text>
              </View>
            </View>
          </View>
          <View 
            style={{ 
              flexDirection: 'row',
              justifyContent: 'center',
              borderBottom: '1pt solid lightgray',  
              paddingVertical: 3,
              marginTop: 10,
              backgroundColor:'#DCDCDC',
              fontWeight:'bold'
            }}>
              <Text style={{fontSize:'12px'}}>Monthly charges</Text>
          </View>
          <View 
            style={{ 
              flexDirection: 'row', 
              borderBottom: '1pt solid lightgray',
              marginBottom: 5, 
              paddingBottom: 5,
            }}>
            <Text style={{ width: '50%',fontSize:'10px' }}>Item</Text>
            <Text style={{ width: '16%', textAlign:'center',fontSize:'10px' }}>Quantity</Text>
            <Text style={{ width: '17%', textAlign:'right',fontSize:'10px' }}>Rate</Text>
            <Text style={{ width: '17%', textAlign:'right',fontSize:'10px' }}>Total</Text>
          </View>
          {totalProducts && totalProducts.filter(product => product.recurrent).map((product, index) => (
              <View key={index} style={{ flexDirection: 'row', borderBottom: '1pt solid black', marginBottom: 5, paddingBottom: 5 }}>
                <Text style={{ width: '50%',fontSize:'10px' }}>{product.title} | <Text style={{ fontSize: '8px' }}>{product.description}</Text></Text>
                <Text style={{ width: '16%', textAlign:'center',fontSize:'10px' }}>{product.total}</Text>
                <Text style={{ width: '17%', textAlign:'right',fontSize:'10px' }}>${product.price.toFixed(2)}</Text>
                <Text style={{ width: '17%', textAlign:'right',fontSize:'10px' }}>{(product.total * product.price).toFixed(2)}</Text>
              </View>
          ))}
          {totalEntrieProducts && totalEntrieProducts.filter(product => product.recurrent).map((product, index) => (
              <View key={index} style={{ flexDirection: 'row', borderBottom: '1pt solid black', marginBottom: 5, paddingBottom: 5 }}>
                <Text style={{ width: '50%',fontSize:'10px' }}>{product.title}</Text>
                <Text style={{ width: '16%', textAlign:'center',fontSize:'10px' }}>{product.quantity}</Text>
                <Text style={{ width: '17%', textAlign:'right',fontSize:'10px' }}>${Number(product.price).toFixed(2)}</Text>
                <Text style={{ width: '17%', textAlign:'right',fontSize:'10px' }}>${Number(product.quantity * product.price).toFixed(2)}</Text>
              </View>
          ))}
          {Users.total !==0 && 
              <View style={{ flexDirection: 'row', borderBottom: '1pt solid black', marginBottom: 5, paddingBottom: 5 }}>
                <Text style={{ width: '50%',fontSize:'10px' }}>{Users.title}</Text>
                <Text style={{ width: '16%', textAlign:'center',fontSize:'10px' }}>{Users.total}</Text>
                <Text style={{ width: '17%', textAlign:'right',fontSize:'10px' }}>${Users.price.toFixed(2)}</Text>
                <Text style={{ width: '17%', textAlign:'right',fontSize:'10px' }}>${(Users.total * Users.price).toFixed(2)}</Text>
              </View>
          }
          {Fax.total !==0 && 
              <View style={{ flexDirection: 'row', borderBottom: '1pt solid black', marginBottom: 5, paddingBottom: 5 }}>
                <Text style={{ width: '50%',fontSize:'10px' }}>{Fax.title}</Text>
                <Text style={{ width: '16%', textAlign:'center',fontSize:'10px' }}>{Fax.total}</Text>
                <Text style={{ width: '17%', textAlign:'right',fontSize:'10px' }}>${Fax.price.toFixed(2)}</Text>
                <Text style={{ width: '17%', textAlign:'right',fontSize:'10px' }}>${(Fax.total * Fax.price).toFixed(2)}</Text>
              </View>
          }
          {Conference.total !==0 && 
              <View style={{ flexDirection: 'row', borderBottom: '1pt solid black', marginBottom: 5, paddingBottom: 5 }}>
                <Text style={{ width: '50%',fontSize:'10px' }}>{Conference.title}</Text>
                <Text style={{ width: '16%', textAlign:'center',fontSize:'10px' }}>{Conference.total}</Text>
                <Text style={{ width: '17%', textAlign:'right',fontSize:'10px' }}>${Conference.price.toFixed(2)}</Text>
                <Text style={{ width: '17%', textAlign:'right',fontSize:'10px' }}>${(Conference.total * Conference.price).toFixed(2)}</Text>
              </View>
          }
          <View 
            style={{ 
              flexDirection: 'row', 
              borderTop: '1pt solid lightgray', 
              marginBottom: 3,
              paddingVertical: 3, 
              backgroundColor:'#DCDCDC',
            }}>
            <Text style={{ width: '83%',fontSize:'12px' }}>Total Monthly Charges</Text>
            <Text style={{ width: '17%', textAlign:'right', fontWeight:'bold',fontSize:'12px' }}>${monthlyTotal.toFixed(2)}</Text>
          </View>

          <View 
            style={{ 
              flexDirection: 'row',
              justifyContent: 'center',
              borderBottom: '1pt solid lightgray',  
              paddingVertical: 3,
              marginTop: 10,
              backgroundColor:'#DCDCDC',
              fontWeight:'bold'
            }}>
              <Text style={{fontSize:'12px'}}>One Time charges</Text>
          </View>
          <View 
            style={{ 
              flexDirection: 'row', 
              borderBottom: '1pt solid lightgray',
              marginBottom: 5, 
              paddingBottom: 5,
            }}>
            <Text style={{ width: '40%',fontSize:'10px' }}>Item</Text>
            <Text style={{ width: '15%', textAlign:'center',fontSize:'10px' }}>Quantity</Text>
            <Text style={{ width: '15%', textAlign:'right',fontSize:'10px' }}>Rate</Text>
            <Text style={{ width: '15%', textAlign:'right',fontSize:'10px' }}>Total</Text>
            <Text style={{ width: '15%', textAlign:'right',fontSize:'10px' }}>Taxes</Text>
          </View>
          {totalProducts && totalProducts.filter(product => !product.product.recurrent).map((product, index) => (
              <View key={index} style={{ flexDirection: 'row', borderBottom: '1pt solid black', marginBottom: 5, paddingBottom: 5 }}>
                <Text style={{ width: '40%',fontSize:'10px' }}>{product.product.title} | <Text style={{ fontSize: '8px' }}>{product.product.description}</Text></Text>
                <Text style={{ width: '15%', textAlign:'center',fontSize:'10px' }}>{product.quantity}</Text>
                <Text style={{ width: '15%', textAlign:'right',fontSize:'10px' }}>${product.product.price.toFixed(2)}</Text>
                <Text style={{ width: '15%', textAlign:'right',fontSize:'10px' }}>{(product.quantity * product.product.price).toFixed(2)}</Text>
                <Text style={{ width: '15%', textAlign:'right',fontSize:'10px' }}>${product.taxes ? (product.quantity * product.product.price * TAX_RATE).toFixed(2) : '0.00'}</Text>
              </View>
          ))}
          {totalEntrieProducts && totalEntrieProducts.filter(product => !product.recurrent).map((product, index) => (
              <View key={index} style={{ flexDirection: 'row', borderBottom: '1pt solid black', marginBottom: 5, paddingBottom: 5 }}>
                <Text style={{ width: '40%',fontSize:'10px' }}>{product.title}</Text>
                <Text style={{ width: '15%', textAlign:'center',fontSize:'10px' }}>{product.quantity}</Text>
                <Text style={{ width: '15%', textAlign:'right',fontSize:'10px' }}>${Number(product.price).toFixed(2)}</Text>
                <Text style={{ width: '15%', textAlign:'right',fontSize:'10px' }}>${Number(product.quantity * product.price).toFixed(2)}</Text>
                <Text style={{ width: '15%', textAlign:'right',fontSize:'10px' }}>${product.taxes ? (Number(product.quantity) * Number(product.price) * TAX_RATE).toFixed(2) : '0.00'}</Text>
              </View>
          ))}
          <View style={{ flexDirection: 'row', borderBottom: '1pt solid black', marginBottom: 5, paddingBottom: 5 }}>
            <Text style={{ width: '66%',fontSize:'10px' }}>Sales Taxes</Text>
            <Text style={{ width: '17%', textAlign:'right',fontSize:'10px' }}>{(TAX_RATE * 100).toFixed(2)}%</Text>
            <Text style={{ width: '17%', textAlign:'right',fontSize:'10px' }}>${oneTimeTax.toFixed(2)}</Text>
          </View>
          <View 
            style={{ 
              flexDirection: 'row', 
              borderTop: '1pt solid lightgray', 
              marginBottom: 3,
              paddingVertical: 3, 
              backgroundColor:'#DCDCDC',
            }}>
            <Text style={{ width: '83%',fontSize:'12px' }}>Total One time Charges</Text>
            <Text style={{ width: '17%', textAlign:'right', fontWeight:'bold',fontSize:'12px' }}>${(oneTimeTotal + oneTimeTax).toFixed(2)}</Text>
          </View>

        </Page>

        <Page size="letter" style={{padding:'2vw'}}>
          
          <View>
            <Text>Credit Card Information</Text>
            <View style={{borderTop: "1pt solid lightgray", marginTop: 10, marginBottom: 10}} />
            <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:'3'}}>
              <Text style={{width:'20%',fontSize:'12'}}>Card Holder:</Text>
              <View style={{border:'1pt solid #d3d3d3',width:'80%',paddingTop:'10'}}>
                <Text style={{color:'white', paddingHorizontal:'16px',textAlign:'center',fontSize:'12px'}}>_</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:'3'}}>
              <Text style={{width:'20%',fontSize:'12px'}}>Business address:</Text>
              <View style={{border:'1pt solid #d3d3d3',width:'80%',paddingTop:'10'}}>
                <Text style={{color:'white', paddingHorizontal:'16px',textAlign:'center',fontSize:'12px'}}>_</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:'3'}}>
              <Text style={{width:'20%',fontSize:'12px'}}>Card Number:</Text>
              <View style={{border:'1pt solid #d3d3d3',width:'80%',paddingTop:'10'}}>
                <Text style={{color:'#c0c0c0', paddingHorizontal:'16px',textAlign:'center',fontSize:'12px'}}> _ _ _ _ - _ _ _ _ - _ _ _ _ - _ _ _ _</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:'3'}}>
              <Text style={{width:'33%',fontSize:'12px'}}>Expiration Month:</Text>
              <Text style={{width:'33%',fontSize:'12px'}}>Expiration Year:</Text>
              <Text style={{width:'33%',fontSize:'12px'}}>CVV:</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{border:'1pt solid #d3d3d3',width:'33%',paddingTop:'10'}}>
                <Text style={{color:'#c0c0c0', paddingHorizontal:'16px',textAlign:'center',fontSize:'12px'}}>MM</Text>
              </View>
              <View style={{border:'1pt solid #d3d3d3',width:'33%',paddingTop:'10'}}>
                <Text style={{color:'#c0c0c0', paddingHorizontal:'16px',textAlign:'center',fontSize:'12px'}}>YY</Text>
              </View>
              <View style={{border:'1pt solid #d3d3d3',width:'33%',paddingTop:'10'}}>
                <Text style={{color:'#c0c0c0', paddingHorizontal:'16px',textAlign:'center',fontSize:'12px'}}>_ _ _</Text>
              </View>
            </View>
          </View>

          <View style={{marginTop:'16px'}}>
            <Text style={{fontSize:'12px',marginBottom:'4px'}}>Signature Disclosure</Text>
            <Text style={{fontSize:'10px',color:'#808080'}}>By signin and accepting below you are acknowledging that you have read and agree to the terms and conditions outlined in this document.</Text>
            <Text style={{textAlign:'center',textDecoration:'underline',marginBottom:'4px'}}>Agreement</Text>
            <Text  style={{fontSize:'10px',color:'#808080',textAlign:'center'}}>THIS SERVICE AGREEMENT AND SERVICE ORDER HEREBY INCORPOORTE BY REFERENCE THE TERMS AND CONDITIONS (AVAILABLE AT https://www.nevtis.com/legal), A COPY OF WHICH WILL BE PROVIDED TO CUSTOMER UPON REQUEST. BY EXECUTING THIS DOCUMENT BELOW, CUSTOMER ACKNOLEDGES THAT: (1) CUSTOMER ACCEPTS TO BE BOUND BY THER TERMS AND CONDITIONS, INCLUDING SECTION 21 THEREOF, WHICH PROVIDES TAHT THE PARTIES DESIRE TO RESOLVE DISPUTES RELATING TO THE PROVIDERS MASTER AGREEMENT THROUGH ARBITRATION; AND (2) BY AGREEING TO ARBITRATION, CUSTOMER IS GIVING UP VARIOUS RIGHTS, INCLUDING THE RIGHT TO TRIAL BY JURY.</Text>
          </View>

          <View style={{marginTop:'16px'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'16px'}}>
              <View style={{width:'50%',textAlign:'center'}}>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>_________________________________</Text>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>Authorized Signature for customer</Text>
              </View>
              <View style={{width:'50%',textAlign:'center'}}>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>_________________________________</Text>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>Authorized Signature for NEVTIS CORP</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'16px'}}>
              <View style={{width:'50%',textAlign:'center'}}>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>_________________________________</Text>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>Printed Name</Text>
              </View>
              <View style={{width:'50%',textAlign:'center'}}>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>_________________________________</Text>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>Printed Name</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'16px'}}>
              <View style={{width:'50%',textAlign:'center'}}>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>_________________________________</Text>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>Title</Text>
              </View>
              <View style={{width:'50%',textAlign:'center'}}>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>_________________________________</Text>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>Title</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'16px'}}>
              <View style={{width:'50%',textAlign:'center'}}>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>_________________________________</Text>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>Date Signed</Text>
              </View>
              <View style={{width:'50%',textAlign:'center'}}>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>_________________________________</Text>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>Date Signed</Text>
              </View>
            </View>
          </View>


        </Page>

        <Page size="letter" style={{padding:'2vw'}}>
          <View>
              <Text>Bank transfer Information</Text>
              <View style={{borderTop: "1pt solid lightgray", marginTop: 10, marginBottom: 10}} />
              <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:'3'}}>
                <Text style={{width:'20%',fontSize:'12'}}>Bank Name:</Text>
                <View style={{border:'1pt solid #d3d3d3',width:'80%',paddingTop:'10'}}>
                  <Text style={{color:'white', paddingHorizontal:'16px',textAlign:'center',fontSize:'12px'}}>_</Text>
                </View>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:'3'}}>
                <Text style={{width:'20%',fontSize:'12px'}}>Account Number:</Text>
                <View style={{border:'1pt solid #d3d3d3',width:'80%',paddingTop:'10'}}>
                  <Text style={{color:'white', paddingHorizontal:'16px',textAlign:'center',fontSize:'12px'}}>_</Text>
                </View>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:'3'}}>
                <Text style={{width:'20%',fontSize:'12px'}}>Routing Number:</Text>
                <View style={{border:'1pt solid #d3d3d3',width:'80%',paddingTop:'10'}}>
                  <Text style={{color:'#c0c0c0', paddingHorizontal:'16px',textAlign:'center',fontSize:'12px'}}> _ _ _ _ - _ _ _ _ - _ _ _ _ - _ _ _ _</Text>
                </View>
              </View>


          </View>
          

          <View style={{marginTop:'16px'}}>
            <Text style={{fontSize:'12px',marginBottom:'4px'}}>Signature Disclosure</Text>
            <Text style={{fontSize:'10px',color:'#808080'}}>By signin and accepting below you are acknowledging that you have read and agree to the terms and conditions outlined in this document.</Text>
            <Text style={{textAlign:'center',textDecoration:'underline',marginBottom:'4px'}}>Agreement</Text>
            <Text  style={{fontSize:'10px',color:'#808080',textAlign:'center'}}>THIS SERVICE AGREEMENT AND SERVICE ORDER HEREBY INCORPOORTE BY REFERENCE THE TERMS AND CONDITIONS (AVAILABLE AT https://www.nevtis.com/legal), A COPY OF WHICH WILL BE PROVIDED TO CUSTOMER UPON REQUEST. BY EXECUTING THIS DOCUMENT BELOW, CUSTOMER ACKNOLEDGES THAT: (1) CUSTOMER ACCEPTS TO BE BOUND BY THER TERMS AND CONDITIONS, INCLUDING SECTION 21 THEREOF, WHICH PROVIDES TAHT THE PARTIES DESIRE TO RESOLVE DISPUTES RELATING TO THE PROVIDERS MASTER AGREEMENT THROUGH ARBITRATION; AND (2) BY AGREEING TO ARBITRATION, CUSTOMER IS GIVING UP VARIOUS RIGHTS, INCLUDING THE RIGHT TO TRIAL BY JURY.</Text>
          </View>
          
          <View style={{marginTop:'16px'}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'16px'}}>
              <View style={{width:'50%',textAlign:'center'}}>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>_________________________________</Text>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>Authorized Signature for customer</Text>
              </View>
              <View style={{width:'50%',textAlign:'center'}}>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>_________________________________</Text>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>Authorized Signature for NEVTIS CORP</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'16px'}}>
              <View style={{width:'50%',textAlign:'center'}}>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>_________________________________</Text>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>Printed Name</Text>
              </View>
              <View style={{width:'50%',textAlign:'center'}}>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>_________________________________</Text>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>Printed Name</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'16px'}}>
              <View style={{width:'50%',textAlign:'center'}}>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>_________________________________</Text>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>Title</Text>
              </View>
              <View style={{width:'50%',textAlign:'center'}}>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>_________________________________</Text>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>Title</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:'16px'}}>
              <View style={{width:'50%',textAlign:'center'}}>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>_________________________________</Text>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>Date Signed</Text>
              </View>
              <View style={{width:'50%',textAlign:'center'}}>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>_________________________________</Text>
                <Text style={{fontSize:'12px',marginBottom:'4px'}}>Date Signed</Text>
              </View>
            </View>
          </View>
        </Page>

    </Document>
  )
}

export default ReactPdfc