import React from "react"
import { Router, Location } from "@reach/router";
import Layout from "../components/Layout";
import TroubleshootSupportBundle from "../components/TroubleshootSupportBundle";
import { Resizer } from "../components/shared/Resize";
import { BreakpointConfig } from "../services/breakpoint";

@Resizer(BreakpointConfig)
class SupportBundle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false
    };
  }

  componentDidMount() {
    if (this.props.breakpoint) {
      this.setState({ isMobile: this.props.breakpoint === "mobile" })
    }
  }

  componentDidUpdate(lastProps) {
    if (this.props.breakpoint !== lastProps.breakpoint && this.props.breakpoint) {
      this.setState({ isMobile: this.props.breakpoint === "mobile" })
    }
  }

  render() {
    return (
    <Layout title="Try troubleshoot specs" isMobile={this.state.isMobile}>
      <FadeTransitionRouter>
        <TroubleshootSupportBundle path="support-bundle/:slug" isMobile={this.state.isMobile} />
      </FadeTransitionRouter>
    </Layout>
    )
  }
}

const FadeTransitionRouter = props => (
  <Location>
    {({ location }) => (
      <Router location={location} className="flex flex1">
        {props.children}
      </Router>
    )}
  </Location>
)

export default SupportBundle;