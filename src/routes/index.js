import React from "react"
import {connect} from "redux-await"
import {Match, Miss, Redirect} from "react-router"
// import {TransitionMotion, spring} from "react-motion"

import Dashboard from "./Dashboard"
import Login from "./Login"
import Register from "./Register"
import Lesson from "./Lesson"
import LessonEditor from "./LessonEditor"
import Class from "./Class"
import NewClass from "./NewClass"
import ClassEditor from "./ClassEditor"
import Stats from "./Stats"
import Quiz from "./Quiz"
import QuizEditor from "./QuizEditor"
import Home from "./Home"
import NotFound from "./NotFound"

import Layout from "../components/Layout"

const mapState = state => ({user: state.user})

const MatchWhenAuthorized = connect(mapState)(({component: Component, alt: Alt, user, ...rest}) => (
  <Match
    {...rest}
    render={props => {
      const Unregistered = Alt ? <Alt {...props} /> : (
        <Redirect
          to={{
            pathname: "/login",
            state: {from: props.location}
          }}
        />
      )
      return typeof user.username === "string" ?
        <Component {...props} />
      : Unregistered
    }}
  />
))

const MatchWhenNotAuthorized = connect(mapState)(({component: Component, user, ...rest}) => (
  <Match
    {...rest}
    render={props => (
      typeof user.username === "string" ? (
        <Redirect
          to={{
            pathname: "/",
            state: {from: props.location}
          }}
        />
      ) : (
        <Component {...props} />
      )
    )}
  />
))

export default () => (
  <Layout>
    <MatchWhenAuthorized exactly pattern="/" component={Dashboard} alt={Home} />
    <MatchWhenAuthorized pattern="/create" component={NewClass} />
    <MatchWhenAuthorized pattern="/stats" component={Stats} />
    <MatchWhenNotAuthorized pattern="/login" component={Login} />
    <MatchWhenNotAuthorized pattern="/register" component={Register} />
    <MatchWhenAuthorized exactly pattern="/lesson/:id" component={Lesson} />
    <MatchWhenAuthorized exactly pattern="/lesson/:id/edit" component={LessonEditor} />
    <MatchWhenAuthorized exactly pattern="/class/:id" component={Class} />
    <MatchWhenAuthorized exactly pattern="/class/:id/edit" component={ClassEditor} />
    <MatchWhenAuthorized exactly pattern="/quiz/:id" component={Quiz} />
    <MatchWhenAuthorized exactly pattern="/quiz/:id/edit" component={QuizEditor} />
    <Miss component={NotFound} />
  </Layout>
)