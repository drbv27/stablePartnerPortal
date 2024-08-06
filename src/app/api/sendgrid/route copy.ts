import sgMail from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not defined');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request: Request) {

  const { to,name, subject, dynamicLink } = await request.json();


  const htmlContent = `
  <img src="https://ci3.googleusercontent.com/meips/ADKq_NaJNueCasTLZB2GwgzGLa43r7oCWgTX04v5bgaKjY4d7B4pZFoPVh3lNRk5J7t1NbG-izfPZ2MGtuPahQbbaXZACjiH9PwtswSHndvsaR-6Goc07AaGlyyJ2XAey-3QBbaXM_-HtA1vcC8udc-jnQYD9LVqSVc2U2AffaHdZNuyjU3Jn7Jki_uu=s0-d-e1-ft#http://cdn.mcauto-images-production.sendgrid.net/23cba222a3bf9b3c/16acc737-32a9-4075-a14f-36f8e3522adf/1000x147.png width="200px" height="30px"" />
  <h3 style="font-weight: bold;">Dear ${name}</h3>
  <p>I hope this message finds you well. I am reaching out to you on behalf of Nevtis Corp.</p>
  <p>Attached to this email, you will find our detailed proposal outlining our services. We firmly believe that our solution can significantly benefit your company.We are keen to discuss further details and address any questions you may have about our proposal. We believe that this collaboration can be mutually beneficial and look forward to the opportunity to work together.</p>
  <p>Please feel free to contact me directly at 855-442-7107 or via email at<a mailto="hello@nevtis.com"> to schedule a meeting or call to discuss this proposal in detail.</a></p>
  <p>Thank you for considering Nevtis Corp. We look forward to the opportunity to work together.</p>
  <p style="font-size: 24px; font-weight: bold">Click the following to see: <a href="${dynamicLink}" style="text-decoration: none; color:orange;">Your Quote</a></p>
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
