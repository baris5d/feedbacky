import ReactMarkdown from 'react-markdown'

const markdown = `

# Getting Started

## What is Feedbacky?

Feedbacky is a tool for collecting feedback from your customers. It's a great way to improve your product and get to know your customers better.

## Creating an account

You can create a new account on our website by clicking on Get started. This will take you to the registering process. 

## How to use it?

To use Feedbacky, you need to create an account. You can do it by clicking the "Get Started" button in the header. After you create an account, you can log in to your account and start using Feedbacky.

## How to get API Key

To use Feedbacky API, you need to get an API key. You can get it by clicking the "Get Started" button in the header. After you create an account, you can log in to your account and get your API key.

`

const GettingStarted = () => {
    return (
        <div className="page getting-started">
            <div className="container">
                <ReactMarkdown children={markdown} />
            </div>
        </div>
        );
    };

export default GettingStarted;