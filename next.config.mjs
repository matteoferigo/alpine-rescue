const env = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
		return [
			{
				source: '/api/arcgis/:path*',
				destination: `${env.ARCGIS_API_URL}/:path*?token=${env.ARCGIS_API_KEY}`,
			},
			{
				source: '/api/tracestrack/:path*',
				destination: `${env.TRACETRACK_API_URL}/:path*?key=${env.TRACETRACK_API_KEY}`,
			},
			{
				source: '/api/openroute/:path*',
				destination: `${env.OPENROUTE_API_URL}/:path*?api_key=${env.OPENROUTE_API_KEY}`,
			},
			{
				source: '/api/overpass',
				destination: `${env.OVERPASS_API_URL}`,
			},
		]
	}
};

export default nextConfig;
