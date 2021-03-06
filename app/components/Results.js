import React from 'react'
import { battle } from "../utils/api";
import Card from "./Card";
import {FaBriefcase, FaCode, FaCompass, FaUsers, FaUser, FaUserFriends} from "react-icons/all";
import PropTypes from "prop-types";
import Loading from "./Loading";

function ProfileList({profile}) {
    return (
        <ul className='card-list'>
            <li>
                <FaUser color='rgb(239, 115, 115)' size={22} />
                {profile.name}
            </li>
            {profile.location && (
                <li>
                    <FaCompass color='rgb(114,116,255)' size={22} />
                    {profile.location}
                </li>
            )}
            {profile.company && (
                <li>
                    <FaBriefcase color='#795548' size={22} />
                    {profile.company}
                </li>
            )}
            <li>
                <FaUsers color='rgb(129, 195, 245)' size={22} />
                {profile.followers.toLocaleString()} followers
            </li>
            <li>
                <FaUserFriends color='rgb(64, 183, 95)' size={22} />
                {profile.following.toLocaleString()} following
            </li>
        </ul>
    )
}

ProfileList.propTypes = {
    profile: PropTypes.object.isRequired
}


export default class Results extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }

    componentDidMount() {
        const { playerOne, playerTwo, onReset } = this.props
        battle([playerOne, playerTwo])
            .then((players) => {
                this.setState({
                    winner: players[0],
                    loser: players[1],
                    error: null,
                    loading: false
                })
            }).catch(({message}) => {
                this.setState({
                    error: message,
                    loading: false
                })
            })
    }

    render() {
        const { winner, loser, error, loading } = this.state
        if(loading === true) {
            return <Loading text={'Battling'} />
        }

        if(error) {
            return (
                <p className='center-text error'>{error.message}</p>
            )
        }

        return (
            <React.Fragment>
                <div className='grid space-around container-sm'>
                    <Card href={winner.profile.html_url}
                          avatar={winner.profile.avatar_url}
                          name={winner.profile.login}
                          subheader={`Score: ${winner.score.toLocaleString()}`}
                          header={winner.score === loser.score ? 'Tie': 'Winner'}
                    >
                        <ProfileList profile={winner.profile} />
                    </Card>
                    <Card header={winner.score === loser.score ? 'Tie': 'Loser'}
                          subheader={`Score: ${loser.score.toLocaleString()}`}
                          name={loser.profile.login}
                          href={loser.profile.html_url}
                          avatar={loser.profile.avatar_url}>
                        <ProfileList profile={loser.profile} />
                    </Card>
                </div>
                <button
                    onClick={this.props.onReset}
                    className='btn dark-btn btn-space'>
                    Reset
                </button>
            </React.Fragment>
        )
    }
}

Results.propTypes = {
    playerOne: PropTypes.string.isRequired,
    playerTwo: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
}