import { jsPDF } from 'jspdf';
import moment from 'moment';
import { promises } from 'fs';
import os from 'os';
const homeDirectory = os.homedir();

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
    doc.text(`The introduction to our report is dedicated to emphasizing the importance of understanding the reasons behind the illegal distribution of content`, 10, 16);
    doc.text(`created by models on various websites. Our company specializes in cleaning and removing these illegal content leaks, aiming to protect copyright`, 10, 22);
    doc.text(`and the reputation of the models. A profound understanding of the motivations behind these actions is essential to take appropriate measures to`, 10, 28);
    doc.text(`combat this phenomenon and to ensure a safer and more responsible digital environment for all users. Through the analysis of relevant data and`, 10, 34);
    doc.text(`metrics, we can gain significant insights into how this illegal content is distributed and consumed online, so that we can develop effective`, 10, 40);
    doc.text(`strategies to combat this phenomenon and protect copyright.`, 10, 46);
    doc.setFontSize(15);
    doc.text(`1. Hosting Revenue:`, 10, 58);
    doc.setFontSize(12);
    doc.text(`Analyzing hosting revenue focuses on how individuals or entities profit from uploading and hosting "leaked" content on various online platforms.`, 10, 70);
    doc.text(`This may involve uploading copyrighted or unfiltered content on hosting sites, thus generating revenue for site owners.`, 10, 76);
    doc.setFontSize(15);
    doc.text(`2. Subscription Profits:`, 10, 88);
    doc.setFontSize(12);
    doc.text(`The analysis of subscription profits focuses on how certain platforms earn money by selling premium subscriptions for access to "leaked" content.`, 10, 100);
    doc.text(`These subscriptions offer users exclusive or enhanced access to content provided by models or other sources.`, 10, 106);
    doc.text(`Understanding how this practice affects the industry and users is essential for taking appropriate measures.`, 10, 118);
    doc.setFontSize(15);
    doc.text(`3. Advertisement Revenue:`, 10, 130);
    doc.setFontSize(12);
    doc.text(`The analysis of advertisement revenue examines how certain websites profit from "leaked" content through displaying ads.`, 10, 142);
    doc.text(`Understanding these practices influences consumers and how they can be countered.`, 10, 154);
    doc.setFontSize(15);
    doc.text(`4. Intermediary Forums & Websites:`, 10, 166);
    doc.setFontSize(12);
    doc.text(`This category analyzes the role of intermediary sites that post references or "leaked" content from other sites. These sites act as intermediaries`, 10, 178);
    doc.text(`between the original source of the content and end-users, often making profits through displaying ads or other means.`, 10, 184);
    doc.text(`Understanding the role and impact of these intermediary forums is crucial for understanding the distribution and propagation of illegal content`, 10, 198);
    doc.text(`online.`, 10, 202);
    doc.setFontSize(15);
    doc.text(`5. Archive Websites:`, 10, 214);
    doc.setFontSize(12);
    doc.text(`This category analyzes archive sites that host "leaked" content without offering direct financial benefits. These sites function as repositories`, 10, 226);
    doc.text(`of illegal content, allowing access to it without paying a subscription or other fees.`, 10, 232);
    doc.text(`Understanding the presence and impact of these archive sites is essential for developing strategies to protect content and copyright.`, 10, 244);
    doc.text(`In conclusion, analyzing hosting revenue, subscription profits, intermediary forums and websites, as well as archive websites, reveals the complexity`, 10, 256);
    doc.text(`and diversity of ways in which illegal content is distributed and monetized on the internet. Understanding these aspects is crucial for developing`, 10, 262);
    doc.text(`effective strategies to protect copyright and combat illegal content distribution. By continuously analyzing and monitoring these practices, we can`, 10, 268);
    doc.text(`contribute to promoting a safer and more ethical online environment for both creators and users.`, 10, 274);
    doc.save(`${homeDirectory}/lockleaks-backend/pdfs/data-analytics_from_${moment(new Date().setMonth(new Date().getMonth() - 1)).format("DD_MMM_YYYY")}_to_${moment(new Date()).format("DD_MMM_YYYY")}_${info.user_id}.pdf`);
    // doc.save(`data-analytics_${info.user_id}.pdf`);
}