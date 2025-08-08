// module.exports = {
//   plugins: {
//     "@tailwindcss/postcss": {},
//     autoprefixer: {},
//   },
// };

// Vercel 환경에서 lightningcss 문제 해결
const isVercel = process.env.VERCEL === "1";

module.exports = {
  plugins: [
    isVercel
      ? ["tailwindcss", "autoprefixer"]
      : ["@tailwindcss/postcss", "autoprefixer"],
  ],
};
