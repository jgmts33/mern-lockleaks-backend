export default {
  host: "smtp.elasticemail.com",
  port: 2525,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    newsEmail: "news@lockleaks.com",
    authEmail: 'no-reply@lockleaks.com',
    deletionEmail: "data-deletion@lockleaks.com",
    kycEmail: "kyc@lockleaks.com",
    apiKey: '3D1F0FA1C5A6F371A302FE01088309D36EFFF8B9267447BEE543CEE904A4DD37ED7B42310822A28268C0278EF8D77F7C'
  },
}