import csv


class EnrollmentFileParser:
    def __init__(self, csv_import_filepath, export_destination):
        self.parse_results = {}
        self.csv_import_filepath = csv_import_filepath
        self.export_destination = export_destination
        self._csv_file_dict = csv.DictReader(open(csv_import_filepath, 'r'))
        self._unique_enrollees = {}
        self._csv_columns = ['User ID', 'First Name', 'Last Name', 'Version', 'Insurance Company']

    def _get_unique_enrollees_by_version(self):
        """
        Creates a dictionary of unique enrollees where only duplicate enrollee ids with the highest version number are
        in the dictionary
        :return: List of unique enrollees
        """
        unique_enrollees_dict = {}

        for line in self._csv_file_dict:
            line_id = line['User ID']

            # Update dict of unique enrollees so that only the highest versioned enrollee ids are in the dict
            if line_id in unique_enrollees_dict.keys():
                if unique_enrollees_dict.get(line_id).get('Version') < line.get('Version'):
                    unique_enrollees_dict[line_id] = line
            else:
                unique_enrollees_dict[line_id] = line

        return unique_enrollees_dict.values()

    def _get_enrollees_by_company(self, enrollees):
        """
        Gets a dictionary of list of enrollees for each company where the key of each list is a company name
        :param enrollees: List of enrollee dictionaries
        :return: Dictionary of list of enrollees for each company from parsed csv file
        """
        enrollee_by_company_dict = {}

        for enrollee in enrollees:
            enrollee_company = enrollee.get('Insurance Company')

            if enrollee_company in enrollee_by_company_dict.keys():
                enrollee_by_company_dict[enrollee_company].append(enrollee)
            else:
                enrollee_by_company_dict[enrollee_company] = []
                enrollee_by_company_dict[enrollee_company].append(enrollee)

        # Sort each list of enrollees
        for company in enrollee_by_company_dict.keys():
            company_enrollee_list = enrollee_by_company_dict[company]
            enrollee_by_company_dict[company] = sorted(company_enrollee_list, key=lambda i: i['Last Name'])

        return enrollee_by_company_dict

    def parse_data(self):
        """
        Parses input CSV file to get a list of unique enrollees for each company
        :return:
        """
        unique_enrollees_list = self._get_unique_enrollees_by_version()
        self.parse_results = self._get_enrollees_by_company(unique_enrollees_list)

    def export_results(self):
        """
        Exports the results of parsing an enrollee CSV file to individual results files
        :return:
        """
        for company in self.parse_results:
            csv_filename = self.export_destination + company + "-results.csv"
            try:
                with open(csv_filename, 'w') as csv_results_file:
                    writer = csv.DictWriter(csv_results_file, self._csv_columns)
                    writer.writeheader()
                    for data in self.parse_results[company]:
                        writer.writerow(data)
            except IOError:
                print('I/O Error')
