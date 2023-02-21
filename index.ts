// Import
import express from "express";
import { PrismaClient } from "@prisma/client";

// Initialize apps
const prisma = new PrismaClient();
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
// Create
app.post("/register", async (req, res) => {
    const { title, content, publish } = req.body;
    // const name = req.body.name;
    // const email = req.body.email;
    const post = await prisma.post.create({
        data: {
            title,
            content,
            published: publish,
        },
    });
    res.json({ post });
});

// Read
app.get("/users", async (req, res) => {
    const posts = await prisma.post.findMany();
    res.json({ posts });
});

// Update
app.put("/update/:id", async (req, res) => {
    const { title, content, published } = req.body;
    const { id } = req.params;
    const updatePosts = await prisma.post.update({
        where: {
            id: parseInt(id),
        },
        data: {
            title,
            content,
            published,
        },
    });
    res.json({ updatePosts });
});

// Delete
app.delete("/delete/:id", async (req, res) => {
    const { title, content, publish } = req.body;
    const { id } = req.params;
    const deleteUser = await prisma.post.delete({
        where: {
            id: parseInt(id),
        },
    });
    res.json({ deleteUser });
});
// Start server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
