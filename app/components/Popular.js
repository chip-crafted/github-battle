import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from "../utils/api";
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle} from "react-icons/all";
import Card from "./Card";
import Loading from "./Loading";

function LanguagesNav({selected, onUpdateLanguage}) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

    return (
        <ul className='flex-center'>
            {languages.map((language) => (
                <li key={language}>
                    <button className='btn-clear nav-link'
                            style={language === selected ? {color: 'rgb(187,46,31)'} : null}
                            onClick={() => onUpdateLanguage(language)}>
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    )
}

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

function ReposGrid({ repos }) {
    return (
        <ul className='grid space-around'>
            {repos.map((repo, index) => {
                const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
                const { login, avatar_url } = owner

                return <li key={html_url}>
                    <Card href={html_url}
                          avatar={avatar_url}
                          name={login}
                          header={`#${index + 1}`}
                    >
                        <ul className='card-list'>
                            <li>
                                <FaUser color='rgb(225, 191, 116)' size={22} />
                                <a href={`https://github.com/${login}`}>{login}</a>
                            </li>
                            <li>
                                <FaStar color={'yellow'} size={22} />
                                {stargazers_count.toLocaleString()} stars
                            </li>
                            <li>
                                <FaCodeBranch color={'lightblue'} size={22}/>
                                {forks.toLocaleString()} forks
                            </li>
                            <li>
                                <FaExclamationTriangle color='rgb(241,138,147)' size={22}/>
                                {open_issues.toLocaleString()} open issues
                            </li>
                        </ul>
                    </Card>

                </li>
             })
            }
        </ul>
    )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

export default class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLanguage: 'All',
            repos: {},
            error: null
        }

        this.updateLanguage = this.updatelanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }

    componentDidMount() {
        this.updatelanguage(this.state.selectedLanguage)
    }

    updatelanguage(selectedLanguage) {
        this.setState({
            selectedLanguage: selectedLanguage,
            error: null,
        })

        if(!this.state.repos[selectedLanguage]) {
            //update repos based on past state so we're using a fxn
            fetchPopularRepos(selectedLanguage)
                .then((data) => {
                    this.setState(({repos}) => ({
                        repos: {
                            ...repos,
                            [selectedLanguage]: data
                        }
                    }))
                })
                .catch(()=> {
                    console.warn('Error fetching repos', error)

                    this.setState({
                        error: 'There was an error fetching the repositories.'
                    })
                })
        }

    }

    isLoading() {
        const { selectedLanguage, repos, error } = this.state
        return !repos[selectedLanguage] && error === null;
    }

    render() {
        const {selectedLanguage, repos, error } = this.state
        return (
            <React.Fragment>
                <LanguagesNav
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />

                {this.isLoading() && <Loading text={'Fetching repos'} />}
                {error && <p className='center-text error'>{error}</p>}
                {repos[selectedLanguage] &&  <ReposGrid repos={repos[selectedLanguage]} />}
            </React.Fragment>
        )
    }
}