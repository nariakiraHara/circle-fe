import { NextPage } from 'next'
export interface Props {
  sample: string
}
const Page: NextPage<Props, Props> = ({ sample }) => {
  return (
  <>
    hello world
    { sample }
  </>
  )
}

Page.getInitialProps = async ({ query }) => {
  return (query as any) as Props
}

export default Page