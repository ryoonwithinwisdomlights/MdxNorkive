import { BLOG } from '@/blog.config'

/**
 * Subscription email-server interface
 * @param {*} email
 * @returns
 */
export default function subscribeToMailchimpApi({
  email,
  first_name = '',
  last_name = ''
}) {
  const listId = BLOG.MAILCHIMP_LIST_ID // Replace with your mailing list ID
  const apiKey = BLOG.MAILCHIMP_API_KEY // Replace with your API KEY
  if (!email || !listId || !apiKey) {
    return {}
  }
  const data = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: first_name,
      LNAME: last_name
    }
  }
  return fetch(`https://us18.api.mailchimp.com/3.0/lists/${listId}/members`, {
    method: 'POST',
    headers: {
      Authorization: `apikey ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

/**
 * client interface
 * @param {*} email
 * @param {*} firstName
 * @param {*} lastName
 * @returns
 */
export async function subscribeToNewsletter(email, firstName, lastName) {
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, first_name: firstName, last_name: lastName })
  })
  const data = await response.json()
  return data
}
