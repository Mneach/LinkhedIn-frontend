import React from 'react'
import { Link } from 'react-router-dom'
import { HastagRichText1, HastagRichText2, MentionRichText, URLRichText } from '../../../model/FormModel'
import MentionHover from '../Home/MentionHover'
import '../../../sass/layout/MainPage/richText.scss'


const RichTextTemplateSearch = ({ texts, }: { texts: string[] }) => {
    return (
        <p>
            {
                texts.map((text) => {
                    if (text.match(HastagRichText2)) {
                        let firstIndexHastag = text.indexOf('[');
                        let lastIndexHastag = text.indexOf(']');
                        let hastagSubString = text.substring(firstIndexHastag + 1, lastIndexHastag)

                        let hastagUrl = text.substring(firstIndexHastag + 2, lastIndexHastag)
                        return <Link className='richText-a' to={`/mainPage/search/tags/${hastagUrl}`}>{hastagSubString} &nbsp;</Link>
                    } else if (text.match(HastagRichText1)) {
                        let hastagUrl = text.substring(1, text.length)
                        return <Link className='richText-a' to={`/mainPage/search/tags/${hastagUrl}`}>{text} &nbsp;</Link>
                    } else if (text.match(URLRichText)) {
                        return <a target="_blank" className='richText-a' rel="noopener noreferrer" href={text}>{text} &nbsp;</a>
                    } else if (text.match(MentionRichText)) {
                        return <MentionHover text={text} />
                    } else {
                        return <span>{text} &nbsp;</span>
                    }
                })
            }
        </p>
    )
}

export default RichTextTemplateSearch