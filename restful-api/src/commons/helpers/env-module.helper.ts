type EnvState = 'production' | 'development'
type EnvModule = Record<EnvState, any>

export const envModule = (modules: EnvModule) => {
	const nodeEnv = process.env.NODE_ENV || 'development'
	return modules[nodeEnv] || modules['else']
}
