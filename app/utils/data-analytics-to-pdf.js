import { jsPDF } from 'jspdf';
import moment from 'moment';
import { promises } from 'fs';

export const downloadDataAnalytics = async (info) => {
    const doc = new jsPDF({
        format: 'a3'
    });

    doc.setFontSize(18);
    doc.text('Monthly Analytics Report - Lock Leaks', 102, 12);
    doc.setFontSize(15);
    doc.text(`${moment(new Date().setMonth(new Date().getMonth() - 1)).format("DD MMM, YYYY")} ~ ${moment(new Date()).format("DD MMM, YYYY")}`, 116, 18);
    doc.text(`Dear ${info.name}`, 10, 30);
    doc.text(`Thank you for being a valued subscriber to our services. Enclosed is your monthly analysis report between `, 10, 39);
    doc.text(`${moment(new Date().setMonth(new Date().getMonth() - 1)).format("DD MMM, YYYY")} and ${moment(new Date()).format("DD MMM, YYYY")}. This report highlights the key activities and insights gathered over the past month.`, 10, 48);
    doc.setFontSize(15);
    doc.text('1. Overview', 10, 60);
    doc.setFontSize(12);
    doc.text('This section presents a brief summary of your usage and key activities during the month.', 10, 66);
    doc.setFontSize(15);
    doc.text('2. Key Metrics', 10, 75);
    doc.setFontSize(12);
    doc.text(`-Total Hosting Revenue: ${info?.hosting_revenue}`, 14, 81);
    doc.text(`-Total Subscription Profits: ${info?.subscription_profits}`, 14, 87);
    doc.text(`-Total Advertisement Revenue: ${info?.advetisement_revenue}`, 14, 93);
    doc.text(`-Total Intermediary Forums & Revenue: ${info?.intermediary_forums_revenue}`, 14, 99);
    doc.text(`-Total Archive Websites: ${info?.active_websites}`, 14, 105);
    doc.setFontSize(15);
    doc.text('3. Our Commitment to Data Analytics', 10, 114)
    doc.setFontSize(12);
    doc.text("At Lock Leaks, we are committed to providing comprehensive data analytics services to ensure your satisfaction and success. Here's how we", 10, 120);
    doc.text("fulfill our commitment:", 10, 126);
    doc.text("-Quality Data Analysis: We continuously update and enhance our data analysis techniques to provide you with accurate and insightful", 14, 132);
    doc.text("information", 16, 138);
    doc.text("-Dedicated Support: Our team of experts is available around the clock to assist you with any questions or concerns you may have regarding", 14, 144);
    doc.text("your data analytics.", 16, 150);
    doc.text("-Data Security: We prioritize the security and privacy of your data, implementing robust measures to safeguard it from unauthorized access", 14, 156);
    doc.text("or misuse.", 16, 162);
    doc.text("For further insights and a detailed explanation of the analytics presented in this report, please visit the Data Analytics section in the", 10, 168);
    doc.text("Lock Leaks Panel on our website.", 10, 174);
    doc.setFontSize(15);
    doc.text("4. Contact Information", 10, 183);
    doc.setFontSize(12);
    doc.text("If you require any assistance or have inquiries regarding your data analytics, please don't hesitate to reach out to our dedicated Customer", 10, 189);
    doc.text("Support team: support@lockleaks.com", 10, 195);
    doc.setFontSize(12);
    const logoBuffer = await promises.readFile('./assets/logo.png');
    const stampBuffer = await promises.readFile('./assets/stamp.png');
    doc.addImage(logoBuffer, "PNG", 4, 192, 120, 30);
    doc.addImage(stampBuffer, "PNG", 10, 218, 30, 30);
    doc.setFont("helvetica", "italic");
    doc.text(`AD BOOST S.R.L.`, 10, 258);
    doc.text(`Romania, Bacau, Strada Letea 32, Bloc A, Ap. 116, 600343`, 10, 264);
    doc.text(`Register Code (CUI): 48091747`, 10, 270);
    doc.text(`VAT: RO48091747`, 10, 276);

    doc.addPage('a3', "p");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(15);
    doc.text('Impact on Security', 10, 10);
    doc.setFontSize(12);
    doc.text(`Our comprehensive approach to security begins with a meticulous scanning process. Leveraging our proprietary software, we conduct extensive`, 10, 16);
    doc.text(`searches across Google, including Search, Images, and Videos, along with an examination of diverse online platforms such as video-streaming`, 10, 22);
    doc.text(`sites, forums, peer-to-peer networks, file hosting services, and major social media platforms like Reddit, Instagram, Twitter, and TikTok.`, 10, 28);
    doc.text(`This process encompasses over 100,000 inspected websites, ensuring a thorough examination of potential brand copyright infringements.`, 10, 34);
    doc.text(`Upon detection of any infringing content, our expert agents promptly initiate the takedown process by issuing DMCA notices to relevant`, 10, 40);
    doc.text(`internet authorities. This dual-layered approach, combining both software and manual scans, allows us to swiftly remove illicit copies of`, 10, 46);
    doc.text(`your content. Our strong affiliations with file hosting sites ensure the expedited consideration of DMCA takedown notices, aligning`, 10, 52);
    doc.text(`seamlessly with our clients' business policies, albeit limited by DMCA compliance.`, 10, 58);
    doc.text(`Furthermore, our membership in Google's Trusted Copyright Removal Program facilitates the rapid delisting of reported infringing content`, 10, 64);
    doc.text(`from Google Search, Google Video, and Google Images. We maintain a perfect track record, successfully removing 100% of reported infringing`, 10, 70);
    doc.text(`content, and we extend these efforts to Microsoft Bing as well.`, 10, 76);
    doc.text(`Incorporating advanced technologies such as facial recognition software, machine learning, optical character recognition, and proprietary`, 10, 82);
    doc.text(`algorithms, our Artificial Intelligence tools fortify content protection against copyright infringements on Google Images and Google Videos,`, 10, 88);
    doc.text(`as well as various social media platforms.`, 10, 94);
    doc.text(`Our dedicated agents conduct manual scans across multiple platforms using specified usernames and chosen keywords, ensuring a proactive`, 10, 100);
    doc.text(`approach to copyright protection. This manual scrutiny spans Google Search, Images & Videos, web-streaming sites, forums, file hosting`, 10, 106);
    doc.text(`platforms, and major social media platforms including Reddit, Twitter, TikTok, and Instagram.`, 10, 112);
    doc.text(`For content creators and cam models, we offer specialized services that include the provision of DMCA badges for integration into clients'`, 10, 118);
    doc.text(`websites or platforms. These badges serve as visual notifications, signaling to potential users that the content is protected by copyright,`, 10, 124);
    doc.text(`and legal actions will be taken against copyright violations.`, 10, 130);
    doc.text(`We extend our protection to shield your brand from impersonation, fraudulent accounts, and harassment across various platforms, including`, 10, 136);
    doc.text(`Reddit, Instagram, Twitter, TikTok, YouTube, Telegram, Facebook, and Discord.`, 10, 142);
    doc.text(`In recognition of the importance of anonymity, we prioritize the protection of your personal information when filing DMCA complaints. Lock`, 10, 148);
    doc.text(`Leaks takes extra precautions by utilizing our company's contact information to lodge DMCA complaints on your behalf, safeguarding your`, 10, 154);
    doc.text(`Our monthly analytics and PDF reports provide clients with detailed insights into their content's performance, trends, interactions, and.`, 10, 160);
    doc.text(`other relevant data. This comprehensive overview aids clients in understanding their content's evolution and devising future strategies.`, 10, 166);
    doc.text(`Additionally, our Username History Recovery & Removal service is designed to provide a historical perspective on content associated with`, 10, 172);
    doc.text(`multiple usernames, ensuring the removal of unauthorized or unwanted content, thereby safeguarding the model's online image and security.`, 10, 178);
    doc.text(`The Reverify & Reanalyzer functionality ensures constant monitoring and periodic updates, identifying new copyright infringements or`, 10, 184);
    doc.text(`reintroduced content. This guarantees the ongoing discovery and appropriate management of illegal activities, maintaining high-security`, 10, 190);
    doc.text(`standards for copyrighted content.`, 10, 196);
    doc.text(`In conclusion, our suite of services, complemented by cutting-edge technology and meticulous manual efforts, significantly reduces the risk`, 10, 202);
    doc.text(`of copyright infringements, fortifying the online security and reputation of our clients.`, 10, 208);
    
    doc.save(`root/lockleaks-backend/pdfs/data-analytics_${info.user_id}.pdf`);
    // doc.save(`data-analytics_${info.user_id}.pdf`);
}