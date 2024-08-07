'use client'
import { Document, Page, Text, View, StyleSheet,Image, Font,pdf } from '@react-pdf/renderer'

interface Product {
  _id: string;
  product: {
    title: string;
    description: string;
    price: number;
    recurrent: boolean;
  };
  quantity: number;
}
interface Entrie {
  _id: string;
  title: string;
  description: string;
  price: string;
  recurrent: boolean;
  quantity: string;
}


const ReactPdfc = ({company,totalProducts,totalEntrieProducts,totalUsers,totalFax,totalConference,portNumbers,specialTerms}:any) => {

  let monthlyTotal = 0;
    let oneTimeTotal = 0;
    let monthlyEntries = 0;
    let oneTimeEntries = 0;
    //console.log(portNumbers)

    //console.log(totalProducts)

    //***********ojo este debe venir de la db******//
    const Users = {title:'Nationwide Unlimited Calling: Business VoIP Phone Service',price:24.99,total:totalUsers}
    const Fax = {title:'Nationwide Unlimited EFax service',price:7.99,total:totalFax}
    const Conference = {title:'Conference',price:14.99,total:totalConference}
    const PortNumbers = {title:'Port Numbers',price:2.00,total:portNumbers.length}
    //***********ojo este debe venir de la db******//

    if (totalProducts.length !== 0) {
      monthlyTotal = totalProducts.reduce((acc:number, product:Product) => product.product.recurrent ? acc + product.quantity * product.product.price : acc, 0)
      oneTimeTotal = totalProducts.reduce((acc:number, product:Product) => !product.product.recurrent ? acc + product.quantity * product.product.price : acc, 0)
  }
  //console.log(monthlyTotal)
  if (totalEntrieProducts.length !== 0) {
      monthlyEntries = totalEntrieProducts.reduce((acc:number, product:Entrie) => product.recurrent ? acc + Number(product.quantity) * Number(product.price) : acc, 0)
      oneTimeEntries = totalEntrieProducts.reduce((acc:number, product:Entrie) => !product.recurrent ? acc + Number(product.quantity) * Number(product.price) : acc, 0)
  }

  if (portNumbers.length > 2) {
    monthlyTotal += monthlyEntries+Users.total*Users.price+Fax.total*Fax.price+Conference.total*Conference.price+((portNumbers.length - 2) * 2.00);
  }else{
    monthlyTotal += monthlyEntries+Users.total*Users.price+Fax.total*Fax.price+Conference.total*Conference.price;
  }
    
    /* monthlyTotal += monthlyEntries+Users.total*Users.price+Fax.total*Fax.price+Conference.total*Conference.price; */
    oneTimeTotal += oneTimeEntries;
    monthlyTotal = parseFloat(monthlyTotal.toFixed(2));
    oneTimeTotal = parseFloat(oneTimeTotal.toFixed(2));
    //console.log(monthlyEntries)
    //console.log(totalEntrieProducts)
  return (
    <Document>
        <Page size="LETTER" style={{padding:'2vw'}}>
          <Text style={{color:'orange',fontSize:'24px',fontWeight:'bold'}}>UCaaS Enterprise</Text>
          <Text style={{fontSize:'16px'}}>Service Proposal</Text>
          <View style={{borderTop: "1pt solid lightgray", marginTop: 10, marginBottom: 10}} />
          <Text style={{fontSize:'12px'}}>{`Proposal For ${company?.companyName}`}</Text>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image 
            src='/nevtis-proposal-header4.png'
            style={{width: '75%', height: 'auto',marginTop: 10,marginLeft: 'auto',marginRight: 'auto'}}
          />
          <Text style={{fontSize:'10px',marginTop: 12}}>
          Welcome to NEVTIS Communications, a pioneering leader in the field of Unified Communications as a Service (UCaaS), Voice over Internet Protocol (VoIP), and Business Internet / Broadband Solutions. With over 25 years of experience in the telecommunications industry, we are dedicated to transforming the way businesses communicate and stay connected.
          </Text>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            src='/features.png'
            style={{width: '75%', height: 'auto',marginTop: 15,marginLeft: 'auto',marginRight: 'auto'}}
          />
        </Page>

        <Page size="LETTER" style={{padding:'2vw'}}>
          <Text>Proposal #102021</Text>
          <View style={{borderTop: "1pt solid lightgray", marginTop: 10, marginBottom: 10}} />
          <Text>Service address: {`${company?.address}`}</Text>
          <Text>Proposal Date: 10/21/2021</Text>
          <Text>Valid Until: 11/21/2021</Text>
          <Text>Location Type: {`${company?.locationType}`}</Text>
          <Text>Site Analysis: {company?.siteAnalysis}</Text>
          <Text>Bandwith: {company?.bandwith}</Text>
          <View style={{borderTop: "1pt solid lightgray", marginTop: 10, marginBottom: 10}} />
          <Text>Proposed Services</Text>
          <View 
            style={{ 
              flexDirection: 'row',
              justifyContent: 'center',
              borderBottom: '1pt solid lightgray',  
              paddingBottom: 5,
              backgroundColor:'#fdba74',
              fontWeight:'bold'
            }}>
              <Text>Monthly charges</Text>
          </View>
          <View 
            style={{ 
              flexDirection: 'row', 
              borderBottom: '1pt solid lightgray', 
              marginBottom: 5, 
              paddingBottom: 5,
              backgroundColor:'orange',
              color:'white' 
            }}>
            <Text style={{ width: '50%' }}>Item</Text>
            <Text style={{ width: '16%', textAlign:'center' }}>Quantity</Text>

            <Text style={{ width: '17%', textAlign:'right' }}>Rate</Text>
            <Text style={{ width: '17%', textAlign:'right' }}>Total</Text>
          </View>

          {Users.total !==0 && 
              <View style={{ flexDirection: 'row', borderBottom: '1pt solid black', marginBottom: 5, paddingBottom: 5 }}>
                <Text style={{ width: '50%' }}>{Users.title}</Text>
                <Text style={{ width: '16%', textAlign:'center' }}>{Users.total}</Text>
                <Text style={{ width: '17%', textAlign:'right' }}>${Users.price.toFixed(2)}</Text>
                <Text style={{ width: '17%', textAlign:'right' }}>${(Users.total * Users.price).toFixed(2)}</Text>
              </View>
          }
          {Fax.total !==0 && 
              <View style={{ flexDirection: 'row', borderBottom: '1pt solid black', marginBottom: 5, paddingBottom: 5 }}>
                <Text style={{ width: '50%' }}>{Fax.title}</Text>
                <Text style={{ width: '16%', textAlign:'center' }}>{Fax.total}</Text>
                <Text style={{ width: '17%', textAlign:'right' }}>${Fax.price.toFixed(2)}</Text>
                <Text style={{ width: '17%', textAlign:'right' }}>${(Fax.total * Fax.price).toFixed(2)}</Text>
              </View>
          }
          {Conference.total !==0 && 
              <View style={{ flexDirection: 'row', borderBottom: '1pt solid black', marginBottom: 5, paddingBottom: 5 }}>
                <Text style={{ width: '50%' }}>{Conference.title}</Text>
                <Text style={{ width: '16%', textAlign:'center' }}>{Conference.total}</Text>
                <Text style={{ width: '17%', textAlign:'right' }}>${Conference.price.toFixed(2)}</Text>
                <Text style={{ width: '17%', textAlign:'right' }}>${(Conference.total * Conference.price).toFixed(2)}</Text>
              </View>
          }

          {portNumbers.length > 2 &&
              <View style={{ flexDirection: 'row', borderBottom: '1pt solid black', marginBottom: 5, paddingBottom: 5 }}>
                <Text style={{ width: '50%' }}>{PortNumbers.title}: {portNumbers.map((port:any,index:number)=><Text key={index}>{port}|</Text>)}</Text>
                <Text style={{ width: '16%', textAlign:'center' }}>{portNumbers.length-2}</Text>
                <Text style={{ width: '17%', textAlign:'right' }}>${PortNumbers.price.toFixed(2)}</Text>
                <Text style={{ width: '17%', textAlign:'right' }}>${((portNumbers.length - 2) * PortNumbers.price).toFixed(2)}</Text>
              </View>
          }


          {totalProducts && totalProducts.filter((product:Product) => product.product.recurrent).map((product:any, index:number) => (
              <View key={index} style={{ flexDirection: 'row', borderBottom: '1pt solid black', marginBottom: 5, paddingBottom: 5 }}>
                <Text style={{ width: '50%' }}>{product.product.title} | <Text style={{ fontSize: '8px' }}>{product.product.description}</Text></Text>
                <Text style={{ width: '16%', textAlign:'center' }}>{product.quantity}</Text>
                <Text style={{ width: '17%', textAlign:'right' }}>${product.product.price.toFixed(2)}</Text>
                <Text style={{ width: '17%', textAlign:'right' }}>{(product.quantity * product.product.price).toFixed(2)}</Text>
              </View>
          ))}
          {totalEntrieProducts && totalEntrieProducts.filter((product:Entrie) => product.recurrent).map((product:any, index:number) => (
              <View key={index} style={{ flexDirection: 'row', borderBottom: '1pt solid black', marginBottom: 5, paddingBottom: 5 }}>
                <Text style={{ width: '50%' }}>{product.title}</Text>
                <Text style={{ width: '16%', textAlign:'center' }}>{product.quantity}</Text>
                <Text style={{ width: '17%', textAlign:'right' }}>${Number(product.price).toFixed(2)}</Text>
                <Text style={{ width: '17%', textAlign:'right' }}>${Number(product.quantity * product.price).toFixed(2)}</Text>
              </View>
          ))}

          <View 
            style={{ 
              flexDirection: 'row', 
              borderTop: '1pt solid lightgray', 
              marginBottom: 5, 
              paddingBottom: 5,
              backgroundColor:'#fdba74',
            }}>
            <Text style={{ width: '83%' }}>Total Monthly Charges</Text>
            <Text style={{ width: '17%', textAlign:'right', fontWeight:'bold' }}>${monthlyTotal.toFixed(2)}</Text>
          </View>
          
          <View 
            style={{ 
              flexDirection: 'row',
              justifyContent: 'center',
              borderBottom: '1pt solid lightgray',  
              paddingBottom: 5,
              backgroundColor:'#fdba74',
              fontWeight:'bold'
            }}>
              <Text>One Time charges</Text>
          </View>
          <View 
            style={{ 
              flexDirection: 'row', 
              borderBottom: '1pt solid lightgray', 
              marginBottom: 5, 
              paddingBottom: 5,
              backgroundColor:'orange',
              color:'white' 
            }}>
            <Text style={{ width: '50%' }}>Item</Text>
            <Text style={{ width: '16%', textAlign:'center' }}>Quantity</Text>

            <Text style={{ width: '17%', textAlign:'right' }}>Rate</Text>
            <Text style={{ width: '17%', textAlign:'right' }}>Total</Text>
          </View>
          {totalProducts && totalProducts.filter((product:Product) => !product.product.recurrent).map((product:any, index:number) => (
              <View key={index} style={{ flexDirection: 'row', borderBottom: '1pt solid black', marginBottom: 5, paddingBottom: 5 }}>
                <Text style={{ width: '50%' }}>{product.product.title} | <Text style={{ fontSize: '8px' }}>{product.product.description}</Text></Text>
                <Text style={{ width: '16%', textAlign:'center' }}>{product.quantity}</Text>
                <Text style={{ width: '17%', textAlign:'right' }}>${product.product.price.toFixed(2)}</Text>
                <Text style={{ width: '17%', textAlign:'right' }}>{(product.quantity * product.product.price).toFixed(2)}</Text>
              </View>
          ))}
          {totalEntrieProducts && totalEntrieProducts.filter((product:Entrie) => !product.recurrent).map((product:any, index:number) => (
              <View key={index} style={{ flexDirection: 'row', borderBottom: '1pt solid black', marginBottom: 5, paddingBottom: 5 }}>
                <Text style={{ width: '50%' }}>{product.title}</Text>
                <Text style={{ width: '16%', textAlign:'center' }}>{product.quantity}</Text>
                <Text style={{ width: '17%', textAlign:'right' }}>${Number(product.price).toFixed(2)}</Text>
                <Text style={{ width: '17%', textAlign:'right' }}>${Number(product.quantity * product.price).toFixed(2)}</Text>
              </View>
          ))}
          <View style={{ flexDirection: 'row', borderBottom: '1pt solid black', marginBottom: 5, paddingBottom: 5 }}>
            <Text style={{ width: '66%' }}>Sales Taxes</Text>
            <Text style={{ width: '17%', textAlign:'right' }}>7.75%</Text>
            <Text style={{ width: '17%', textAlign:'right' }}>${(oneTimeTotal*0.0775).toFixed(2)}</Text>
          </View>
          <View 
            style={{ 
              flexDirection: 'row', 
              borderTop: '1pt solid lightgray', 
              marginBottom: 5, 
              paddingBottom: 5,
              backgroundColor:'#fdba74',
            }}>
            <Text style={{ width: '83%' }}>Total One time Charges</Text>
            <Text style={{ width: '17%', textAlign:'right', fontWeight:'bold' }}>${(oneTimeTotal+oneTimeTotal*0.0775).toFixed(2)}</Text>
          </View>
        </Page>

        <Page size="LETTER" style={{padding:'2vw'}}>
            <Text>Special Terms</Text>
            {specialTerms && <Text>{specialTerms}</Text>}
            <View style={{borderTop: "1pt solid lightgray", marginTop: 10, marginBottom: 10}} />
            <Text>Our objetive</Text>
            <Text>We are excited about the prospect of brining our to-tier UCaaS, VoIP, or Broadband Solutions to your esteemed organization. At NEVTIS, we believe in creating lasting partnerships and are dedicated to empowering your business with our innovative communications platforms.</Text>
            <Text>We look forward to a fruitful collaboration and the opportunity to contribute to the success of your business.</Text>
            <Text>NEVTIS CORP</Text>
            <Text>1525 E Ontario Ave Suite 100, Corona, CA 92881</Text>
            <Text>https://nevtis.com | 855-442-7107 | hello@nevtis.com</Text>
            <View style={{borderTop: "1pt solid lightgray", marginTop: 10, marginBottom: 10}} />
            <Text>Proposal Agreements</Text>
            <Text>(C) 2024 NEVTIS CORP All rights reserved. NEVTIS & Related Companies are a leading UCaaS, VoIP, & Business Internet provider with the vision to expand its technology and offer an enterprise system built for small business. Additional terms and conditions may be found at: https://nevtis.com/legal. If proposal is accepted, and official service agreement contract via Electronic Signature will be emailed to the authorized contact. </Text>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              src='/footer-revolution.png'
              style={{width: '90%', height: 'auto',marginTop: 10,marginLeft: 'auto',marginRight: 'auto'}}
            />
        </Page>

    </Document>
  )
}

export default ReactPdfc