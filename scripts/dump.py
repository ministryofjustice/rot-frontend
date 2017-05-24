import argparse
import json
import os

import airtable


PWD = os.path.abspath(os.path.dirname(__file__))
VAR = os.path.abspath(os.path.join(PWD, '../var'))

if not os.path.exists(VAR):
    os.makedirs(VAR)


TABLES = ['Service', 'Person', 'Category', 'Organisation']


def get_filename(table):
    return os.path.join(VAR, '{}.json'.format(table.lower()))


def dump(api_key, sheet_id):
    client = airtable.Client(sheet_id, api_key)
    for table in TABLES:
        data = client.list(table)
        filename = get_filename(table)
        print('dump {} table into {}'.format(table, filename))
        with open(filename, 'w') as fp:
            json.dump(data, fp, indent=2)


def integrate():
    services = [
        {
            'id': service['id'],
            'name': service['fields'].get('Name', ''),
            'description': service['fields'].get('Description', ''),
            'ownerId': (
                service['fields']['Owner'][0]
                if service['fields'].get('Owner') else ''
            ),
            'categoryId': (
                service['fields']['Service Category'][0]
                if service['fields'].get('Service Category') else ''
            ),
            'areaIds': [
                area_id for area_id in
                service['fields'].get('Business Area', [])
            ]
        }
        for service in
        json.load(open(get_filename('Service')))
        if service['fields'].get('Name')
    ]
    owners = [
        {
            'id': owner['id'],
            'name': owner['fields'].get('Name', ''),
            'email': owner['fields'].get('Email', ''),
            'role': owner['fields'].get('Role(Temporary)', ''),
            'peopleFinderUrl': owner['fields'].get('People Finder link', ''),
        }
        for owner in
        json.load(open(get_filename('Person')))
        if owner['fields'].get('Name')
    ]
    organisations = [
        {
            'id': organisation['id'],
            'name': organisation['fields'].get('Name', ''),
            'description': organisation['fields'].get('Description', ''),
            'parentId': (
                organisation['fields']['Parent'][0]
                if organisation['fields'].get('Parent') else ''
            )
        }
        for organisation in
        json.load(open(get_filename('Organisation')))
        if organisation['fields'].get('Name')
    ]
    categories = [
        {
            'id': category['id'],
            'name': category['fields'].get('Name', ''),
            #  'name': category['fields'].get('Category', ''),
            'description': category['fields'].get('Description', ''),
            'parentId': (
                category['fields']['Parent'][0]
                if category['fields'].get('Parent') else ''
            )
        }
        for category in
        json.load(open(get_filename('Category')))
        if category['fields'].get('Name')
    ]
    data = {
        'services': services,
        'owners': owners,
        'organisations': organisations,
        'categories': categories
    }
    #  print(data)
    with open(get_filename('db'), 'w') as fp:
        json.dump(data, fp, indent=2)


def argument_parser():
    parser = argparse.ArgumentParser(
        description='describe me')
    parser.add_argument(
        '--api-key', '-k', required=True,
        help='api key')
    parser.add_argument(
        '--sheet-id', '-s', required=True,
        help='sheet id')
    return parser


def main(argv=None):
    args = argument_parser().parse_args(argv)
    dump(args.api_key, args.sheet_id)
    integrate()


if __name__ == '__main__':
    main()
