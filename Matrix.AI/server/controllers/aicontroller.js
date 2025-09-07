import OpenAI from "openai";
import { sql } from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";




// Configure OpenAI client (using Gemini API endpoint)
const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY, // Gemini API key from .env
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/" // Gemini base URL
});

// Controller to generate an article
export const generateArticle = async (req, res) => {
    try {
        // Extract user info from Clerk's auth middleware
        const { userId } = req.auth();

        // Get input from request body
        const { prompt, length } = req.body;

        // Extract plan type and free usage count from middleware
        const plan = req.plan;
        const free_usage = req.free_usage;

        // Restrict free users if they exceed usage limit
        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({ success: false, message: "Limit reached. Upgrade to continue." });
        }

        // Call Gemini API to generate article content
        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash", // Model used
            messages: [
                {
                    role: "user",
                    content: prompt, // User prompt
                },
            ],
            temperature: 0.7,    // Creativity level
            max_tokens: length,  // Limit output length
        });

        // Extract generated content
        const content = response.choices[0].message.content;

        // Save creation into PostgreSQL database
        await sql`
            INSERT INTO creations (user_id, prompt, content, type) 
            VALUES(${userId}, ${prompt}, ${content}, 'article')
        `;

        // If not premium, increment free usage count in Clerk metadata
        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            });
        }

        // Send success response with generated content
        res.json({ success: true, content });

    } catch (error) {
        console.log(error.message);
      
        res.json({ success: false, message: error.message });
    }
};


export const generateBlogTitle = async (req, res) => {
    try {
        // Extract user info from Clerk's auth middleware
        const { userId } = req.auth();

        // Get input from request body
        const { prompt } = req.body;

        // Extract plan type and free usage count from middleware
        const plan = req.plan;
        const free_usage = req.free_usage;

        // Restrict free users if they exceed usage limit
        if (plan !== 'premium' && free_usage >= 10) {
            return res.json({ success: false, message: "Limit reached. Upgrade to continue." });
        }

        // Call Gemini API to generate article content
        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash", // Model used
            messages: [
                {
                    role: "user",
                    content: prompt, // User prompt
                },
            ],
            temperature: 0.7,    // Creativity level
            max_tokens: 100,  // Limit output length
        });

        // Extract generated content
        const content = response.choices[0].message.content;

        // Save creation into PostgreSQL database
        await sql`
            INSERT INTO creations (user_id, prompt, content, type) 
            VALUES(${userId}, ${prompt}, ${content}, 'blog-title')`;

        // If not premium, increment free usage count in Clerk metadata
        if (plan !== 'premium') {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1
                }
            });
        }

        // Send success response with generated content
        res.json({ success: true, content });

    } catch (error) {
        console.log(error.message);
      
        res.json({ success: false, message: error.message });
    }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.status(428).json({
        success: false,
        message: "This feature is only available for premium subscriptions.",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: { "x-api-key": process.env.CLIPDROP_API_KEY },
        responseType: "arraybuffer",
      }
    );

    // This line is the issue. Change `DataTransfer` to `data`.
    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary"
    ).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql` INSERT INTO creations (user_id, prompt, content, type, publish)
    VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})`;

    res.status(200).json({ success: true, content: secure_url });
  } catch (error) {
    res.status(509).json({ success: false, message: error.message });
  }
};


export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.status(429).json({
        success: false,
        message: "This feature is only available for premium subscriptions.",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await sql` INSERT INTO creations (user_id, prompt, content, type)
    VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')`;

    res.status(200).json({
      success: true,
      message: "Background removed successfully",
      secure_url: secure_url,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.status(429).json({
        success: false,
        message: "This feature is only available for premium subscriptions.",
      });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });

    await sql` INSERT INTO creations (user_id, prompt, content, type)
    VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')`;

    res.status(200).json({ success: true, content: imageUrl });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume  = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.status(429).json({
        success: false,
        message: "This feature is only available for premium subscriptions.",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.status(413).json({
        success: false,
        message: "Resume file size exceeds allowed size (5MB).",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive
    feedback on its strengths, weakness, and areas for improvement. Resume
    Content:\n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });
    const content = response.choices[0].message.content;

    await sql` INSERT INTO creations (user_id, prompt, content, type)
    VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`;

    res.status(200).json({ success: true, content });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



