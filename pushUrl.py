import argparse
import random
import re
import ssl
import time

import requests

ssl._create_default_https_context = ssl._create_unverified_context


# Daily push limit, can be modified according to actual situation
QUOTA = 100


def parse_stiemap(site):
    site = f"{site}/sitemap.xml"
    try:
        result = requests.get(site)
        big = re.findall("<loc>(.*?)</loc>", result.content.decode("utf-8"), re.S)
        return list(big)
    except:
        print("Please check if your url is correct.")
        print(
            "The correct one should be the complete domain name, including https://, and not including ‘sitemap.xml’, as shown below:"
        )
        print("correct example: https://ghlcode.cn")
        print(
            "For details, see: https://ghlcode.cn/fe032806-5362-4d82-b746-a0b26ce8b9d9"
        )


def push_to_bing(site, urls, api_key):
    endpoint = (
        f"https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey={api_key}"
    )

    payload = {"siteUrl": site, "urlList": urls}

    try:
        response = requests.post(endpoint, json=payload)
        result = response.json()
        if response.status_code == 200:
            print("Successfully pushed to Bing.")
        elif "ErrorCode" in result:
            print(
                "An error occurred when pushing to Bing. The error message is:",
                result["Message"],
            )
    except Exception as e:
        print("An error occurred:", e)


def push_to_baidu(site, urls, token):
    api_url = f"http://data.zz.baidu.com/urls?site={site}&token={token}"

    payload = "\n".join(urls)
    headers = {"Content-Type": "text/plain"}

    try:
        response = requests.post(api_url, data=payload, headers=headers)
        result = response.json()
        if "success" in result and result["success"]:
            print("Successfully pushed to Baidu.")
        elif "error" in result:
            print(
                "An error occurred when pushing to Baidu. The error message is：",
                result["message"],
            )
        else:
            print("Unknown response from Baidu:", result)
    except Exception as e:
        print("An error occurred:", e)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="parse sitemap")
    parser.add_argument("--url", type=str, default=None, help="The url of your website")
    parser.add_argument(
        "--bing_api_key", type=str, default=None, help="your bing api key"
    )
    parser.add_argument(
        "--baidu_token", type=str, default=None, help="Your baidu push token"
    )
    args = parser.parse_args()

    # Get the current timestamp as a random seed
    current_timestamp = int(time.time())
    random.seed(current_timestamp)

    if args.url:
        # parse urls
        urls = parse_stiemap(args.url)
        if urls is not None:
            # Determine whether the current number of URLs exceeds the quota. If it exceeds the quota, the maximum value of the day is taken. The default is 100, which can be modified according to the actual situation.
            if len(urls) > QUOTA:
                urls = random.sample(urls, QUOTA)
            # push bing
            if args.bing_api_key:
                print("Pushing to Bing, please wait...")
                push_to_bing(args.url, urls, args.bing_api_key)
            # Push Baidu
            if args.baidu_token:
                print("Pushing to Baidu, please wait...")
                push_to_baidu(args.url, urls, args.baidu_token)
    else:
        print("Please go to Github Action Secrets 配置 URL")
        print(
            "For details, see: https://ghlcode.cn/fe032806-5362-4d82-b746-a0b26ce8b9d9"
        )
