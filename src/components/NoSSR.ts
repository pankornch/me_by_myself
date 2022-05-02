import dynamic from "next/dynamic"

const NoSSR = (component: React.FunctionComponent<object>) => {
	return dynamic(() => Promise.resolve(component), { ssr: false })
}

export default NoSSR
