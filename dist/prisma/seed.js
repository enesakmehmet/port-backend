"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("🚀 Seed işlemi başlatıldı...");
    /** ------------------------
     * 🧑‍💼 Admin User Seed
     ------------------------- */
    const email = "admin@mail.com";
    const password = "123456";
    const hashed = await bcrypt_1.default.hash(password, 10);
    const existing = await prisma.adminUser.findUnique({ where: { email } });
    if (!existing) {
        const admin = await prisma.adminUser.create({
            data: { email, password: hashed, role: "admin" },
        });
        console.log("✅ Admin user oluşturuldu:", admin.email);
    }
    else {
        console.log("⚠️ Admin zaten var:", existing.email);
    }
    /** ------------------------
     * 💪 Skills Seed
     ------------------------- */
    const skills = [
        { name: "Visual Studio Code", level: 90, category: "Tool", icon: "SiVisualstudiocode" },
        { name: "GitHub", level: 90, category: "Tool", icon: "FaGithub" },
        { name: "Postman", level: 80, category: "Tool", icon: "SiPostman" },
        { name: "Web Tasarım", level: 85, category: "Design", icon: "MdWeb" },
        { name: "HTML", level: 95, category: "Frontend", icon: "FaHtml5" },
        { name: "CSS", level: 90, category: "Frontend", icon: "FaCss3Alt" },
        { name: "Bootstrap", level: 80, category: "Frontend", icon: "FaBootstrap" },
        { name: "Sass", level: 75, category: "Frontend", icon: "FaSass" },
        { name: "Figma", level: 70, category: "Design", icon: "FaFigma" },
        { name: "JavaScript", level: 95, category: "Frontend", icon: "SiJavascript" },
        { name: "React", level: 90, category: "Frontend", icon: "FaReact" },
        { name: "TypeScript", level: 85, category: "Frontend", icon: "SiTypescript" },
        { name: "Zustand", level: 80, category: "State Management", icon: "SiZustand" },
        { name: "React Hook Form", level: 75, category: "Form", icon: "SiReacthookform" },
        { name: "Node.js", level: 85, category: "Backend", icon: "FaNodeJs" },
        { name: "Express.js", level: 85, category: "Backend", icon: "SiExpress" },
        { name: "Passport.js", level: 70, category: "Auth", icon: "SiPassport" },
        { name: "Prisma ORM", level: 80, category: "Database", icon: "SiPrisma" },
        { name: "NestJS", level: 75, category: "Backend", icon: "SiNestjs" },
    ];
    for (const skill of skills) {
        await prisma.skill.upsert({
            where: { name: skill.name },
            update: skill,
            create: skill,
        });
    }
    console.log("✅ Skills seed tamamlandı!");
    /** ------------------------
     * 👁️ Visitor Logs Seed
     ------------------------- */
    await prisma.visitorLog.createMany({
        data: [
            { ip: "127.0.0.1", userAgent: "Chrome 122.0.0 / Windows 10", page: "/" },
            { ip: "192.168.1.10", userAgent: "Firefox 118.0 / Ubuntu 22.04", page: "/projects" },
            { ip: "85.103.24.50", userAgent: "Safari 17.0 / macOS 14", page: "/skills" },
            { ip: "213.42.12.88", userAgent: "Opera 95.0 / Windows 11", page: "/timeline" },
        ],
        skipDuplicates: true,
    });
    console.log("✅ Visitor log dummy kayıtları eklendi!");
    /** ------------------------
     * 🧍 About Seed
     ------------------------- */
    await prisma.about.upsert({
        where: { id: 1 },
        update: {
            bio: "Merhaba, ben Enes Akmehmet. Fullstack Developer 🚀",
            avatarUrl: "/uploads/avatar.png",
            github: "https://github.com/Enes-akmehmet",
            linkedin: "https://linkedin.com/in/enesakmehmet",
            instagram: "https://instagram.com/enesakmehmet",
            cvUrl: "/uploads/enes-akmehmet-cv.pdf",
            name: "Enes Akmehmet",
        },
        create: {
            bio: "Merhaba, ben Enes Akmehmet. Fullstack Developer 🚀",
            avatarUrl: "/uploads/avatar.png",
            github: "https://github.com/Enes-akmehmet",
            linkedin: "https://linkedin.com/in/enesakmehmet",
            instagram: "https://instagram.com/enesakmehmet",
            cvUrl: "/uploads/enes-akmehmet-cv.pdf",
            name: "Enes Akmehmet",
        },
    });
    console.log("✅ About bilgisi eklendi!");
    console.log("🎉 Seed işlemi başarıyla tamamlandı!");
}
main()
    .catch((e) => {
    console.error("❌ Seed hatası:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map