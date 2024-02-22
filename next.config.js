/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePaths: ["./src/sass"],
  },
};

module.exports = nextConfig;
