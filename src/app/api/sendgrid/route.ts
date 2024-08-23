import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not defined');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request: Request) {

  const { to,name, subject,text, dynamicLink } = await request.json();


  const htmlContent = `
  <img src="https://ci3.googleusercontent.com/meips/ADKq_NaJNueCasTLZB2GwgzGLa43r7oCWgTX04v5bgaKjY4d7B4pZFoPVh3lNRk5J7t1NbG-izfPZ2MGtuPahQbbaXZACjiH9PwtswSHndvsaR-6Goc07AaGlyyJ2XAey-3QBbaXM_-HtA1vcC8udc-jnQYD9LVqSVc2U2AffaHdZNuyjU3Jn7Jki_uu=s0-d-e1-ft#http://cdn.mcauto-images-production.sendgrid.net/23cba222a3bf9b3c/16acc737-32a9-4075-a14f-36f8e3522adf/1000x147.png width="200px" height="30px"" />
  <p style="font-size: 16px; color: black">${text}</p>
  <p style="font-size: 18px; font-weight: bold; color:black">Click the following to see: <a href="${dynamicLink}" style="text-decoration: none; color:orange;">Your Quote</a></p>
  <img src="https://ci3.googleusercontent.com/meips/ADKq_NaMpl07ZnuEiLMr2Pvhtg2PA7XPe-21M9zC023LL_ZQktTV8L8re0MT06m-CwTfUE2TnG_3jgoNLb_EDQFsERvhnOLbVLa9qIBjydOoEAv8Fs0pki2oZADNa3qgzhCJKKe__5g4ntFcSNxIdyW8rVGF0fYdWWcjLf25bL_JnHRhuDeSXq0ha5ul=s0-d-e1-ft#http://cdn.mcauto-images-production.sendgrid.net/23cba222a3bf9b3c/d15d86ce-22cb-49d0-9cac-45f5b9c11866/1200x307.png width="400px" height="102px" />
  `;

  const msg = {
    to,
    from: 'support@nevtis.com', // Replace with your SendGrid verified sender
    subject,
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    return new Response('Email sent successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error sending email', { status: 500 });
  }
}

/* export const config = {
  runtime: 'edge',
}; */
