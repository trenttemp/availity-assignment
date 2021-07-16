import sys

import EnrollmentFileParser


def main():
    if len(sys.argv) != 3:
        print('Invalid usage: Correct usage: "python3 main.py '
              '<path to enrollment csv file> '
              '<path to desired parse results destination"')
    else:
        csv_filepath = sys.argv[1]
        export_path = sys.argv[2]

        # Parse data and download result files
        enrollment_file_parser = EnrollmentFileParser.EnrollmentFileParser(csv_filepath, export_path)
        enrollment_file_parser.parse_data()
        enrollment_file_parser.export_results()


if __name__ == '__main__':
    main()
