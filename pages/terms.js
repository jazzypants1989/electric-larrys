import TermsAndConditions from "../components/TermsAndConditions"
import Privacy from "../components/Privacy"
import Layout from "../components/Layout"
export default function terms() {
  return (
    <div>
      <Layout>
        <Privacy />
        <TermsAndConditions />
      </Layout>
    </div>
  )
}
