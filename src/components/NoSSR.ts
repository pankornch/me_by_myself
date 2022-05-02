import dynamic from "next/dynamic"

const NoSSR = (component: React.FunctionComponent<any>) => {
	return dynamic(() => Promise.resolve(component), { ssr: false })
}

export default NoSSR
