import TermsAndConditions from "../components/Terms/TermsAndConditions"
import Privacy from "../components/Terms/Privacy"
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
