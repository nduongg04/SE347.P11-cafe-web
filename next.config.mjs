/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: "https://coffeemanagementapi.azurewebsites.net/api/v1",
    },
	images: {
		domains: ["img.pikbest.com"],
	},
};

export default nextConfig;
