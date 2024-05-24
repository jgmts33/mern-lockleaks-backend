import axios from "axios";
import db from "../models/index.js";
import fs from 'fs';
import archiver from 'archiver';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { socialMediaProfiles: SocialMediaProfiles } = db;

export const storeSocialMediaProfiles = async (req, res) => {

  try {

    const { id } = req.params;
    const { links } = req.body;

    // Generate current date string
    const currentDate = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).replace(/[/,:]/g, '-').replace(/\s/g, '_');

    // Mapping of common domains to their canonical names
    const domainMapping = {
      'x': 'Twitter',
      'twitter': 'Twitter',
      'facebook': 'Facebook',
      'instagram': 'Instagram',
      'telegram': 'Telegram',
      'reddit': 'Reddit'
    };

    // Create the text file content
    let content = `USERID: ${id}\n`;

    // Initialize an empty object to hold social media platforms and their links
    const socialPlatforms = {};

    // Process each link and categorize them by social media platform
    links.forEach(link => {
      // Extract the domain part of the URL to determine the social media platform
      let domain = new URL(`https://${link}`).hostname.split('.')[0];

      // Check if there's a mapping for the domain
      const mappedPlatform = domainMapping[domain];
      if (mappedPlatform) {
        // If there's a mapping, use the mapped platform name
        domain = mappedPlatform;
      }

      if (!socialPlatforms[domain]) {
        // If the platform doesn't exist yet, add it to the object
        socialPlatforms[domain] = [];
      }

      // Add the link to the corresponding platform array
      socialPlatforms[domain].push(link);
    });

    // Now, iterate over the socialPlatforms object to generate the content
    Object.entries(socialPlatforms).forEach(([platform, links]) => {
      content += `${platform.toUpperCase()}\n`;
      links.forEach(link => {
        content += `${link}\n`;
      });
      content += '\n'; // Add a newline between different platforms for clarity
    });

    // Write the content to a.txt file
    const txtFilePath = path.join(__dirname, '../../', 'data', `${currentDate}_profiles.txt`);

    // Ensure the directory exists
    const dirPath = path.dirname(txtFilePath);
    await fs.promises.mkdir(dirPath, { recursive: true });

    // Now safely write the file
    await fs.promises.writeFile(txtFilePath, content);

    // Create a ZIP file
    const archiveName = `social.${id}.${currentDate}.zip`;
    const archivePath = path.join(__dirname, '../../', 'data', archiveName);
    const output = fs.createWriteStream(archivePath);
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    });

    archive.pipe(output);

    // Append the.txt file to the ZIP
    archive.append(fs.createReadStream(txtFilePath), { name: 'profiles.txt' });
    archive.finalize();

    // Save data to the database
    await SocialMediaProfiles.create({
      name: currentDate,
      count: links.length,
      user_id: id,
    });

    res.status(200).send({ message: 'Data saved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while processing your request.' });
  }
};