

const loadConfig = async () => {
  await import("./src/env.js");

  /** @type {import("next").NextConfig} */
  const config = {
    reactStrictMode: true,

    /**
     
     *
     * @see https://github.com/vercel/next.js/issues/41980
     */
    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '', 
          pathname: '/**', 
        },
      ],
    },
  };

  return config;
};

export default await loadConfig();
