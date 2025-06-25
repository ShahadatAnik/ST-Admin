import { EUB_LOGO } from '@/assets/images/base64';
import { checkBox, checkWithoutBox } from '@/assets/svg';
import { IAdmissionTableData } from '@/pages/portfolio/admission/_config/columns/columns.type';
import { format, formatDate } from 'date-fns';

import { customTable, DEFAULT_FONT_SIZE, xMargin } from '@/components/pdf/ui';
import { DEFAULT_A4_PAGE } from '@/components/pdf/utils';

import pdfMake from '..';
import { getPageFooter } from './utils';

const getDateFormate = (date: string): string => format(new Date(date), 'dd/MM/yyyy');

export default function Index(data: IAdmissionTableData) {
	const headerHeight = 20;
	const footerHeight = 0;
	const IDArray = data?.student_id?.split('');
	const student_id = data?.student_id
		? {
				table: {
					widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
					body: [IDArray?.map((id) => ({ text: id, alignment: 'center' }))],
				},
			}
		: { text: '' };

	const pdfDocGenerator = pdfMake.createPdf({
		...DEFAULT_A4_PAGE({
			xMargin,
			headerHeight,
			footerHeight,
		}),

		// * Page Header
		// * Page Footer
		footer: (currentPage: number, pageCount: number) => ({
			table: getPageFooter({ currentPage, pageCount }),
			margin: [xMargin, 2],
			fontSize: DEFAULT_FONT_SIZE,
		}),

		// * Main Table
		content: [
			{
				table: {
					headerRows: 1,
					widths: [80, 10, '*'],
					body: [
						[
							{
								image: EUB_LOGO,
								width: 50,
								height: 40,
								alignment: 'right',
							},
							{},
							{
								text: ' European University of Bangladesh',
								fontSize: DEFAULT_FONT_SIZE + 14,
								bold: true,
								color: '#023020',
								style: 'header',
							},
						],
						[
							{
								text: '(Approved by UGC & Govt.)',
								fontSize: DEFAULT_FONT_SIZE + 4,
								alignment: 'center',
								bold: true,
								colSpan: 3,
							},
						],
						[
							{
								text: 'Permanent Campus: 2/4 ,Gabtoli, Mirpur, Dhaka-1216',
								bold: true,
								colSpan: 3,
								alignment: 'center',
							},
						],
						[
							{
								text: ' Cell: 01968-774927, E-mail: info@eub.edu.bd 30392',
								colSpan: 3,
								alignment: 'center',
							},
						],
						[
							{
								text: '                                                                                                                ',
								colSpan: 3,
								alignment: 'center',
								decoration: 'overline',
							},
						],
					],
				},
				layout: customTable,
			},
			{ text: '\n' },
			{
				table: {
					widths: ['*'],
					body: [
						[
							{
								text: `Serial No-${data?.id}`,
								bold: true,
								alignment: 'left',
							},
						],
						[
							{
								text: 'Application For Admission',
								fontSize: DEFAULT_FONT_SIZE + 4,
								alignment: 'center',
								bold: true,
								lineHeight: 1.5,
							},
						],
					],
				},
				layout: 'noBorders',
			},
			{
				table: {
					widths: [110, 20, 70, 20, 70, 20, 70, '*'],
					body: [
						[
							{
								text: 'Proposed Semester',
								bold: true,
							},
							{
								svg: data?.semester === 'spring' ? checkBox : checkWithoutBox,
								width: 30,
								height: 20,
								alignment: 'right',
							},
							{
								text: 'Spring',
								alignment: 'left',
							},
							{
								svg: data?.semester === 'summer' ? checkBox : checkWithoutBox,
								width: 30,
								height: 20,
								alignment: 'right',
							},
							{
								text: 'Summer',
								alignment: 'left',
							},
							{
								svg: data?.semester === 'fall' ? checkBox : checkWithoutBox,
								width: 30,
								height: 20,
								alignment: 'right',
							},
							{
								text: 'Fall',
								alignment: 'left',
							},
							{
								text: `Year: ${data?.year}`,
							},
						],
					],
				},
				layout: customTable,
			},
			{
				table: {
					widths: [200, 20, '*'],
					body: [
						[
							{
								text: 'Check list of documents to be attached\n a) Copies of academic certificates, mark sheets and photographs.\n b) Experience certificates, if any (in case of EMBA)',
								lineHeight: 1.5,
								border: [false, false, false, false],
							},
							{ text: '', border: [false, false, false, false] },
							{
								table: {
									widths: [60, '*'],
									body: [
										[
											{
												text: 'Official Use Only',
												bold: true,
												alignment: 'left',
												colSpan: 2,
											},
											{},
										],
										[
											{
												text: 'Student ID',
												alignment: 'left',
											},
											student_id,
										],
										[
											{
												text: `Admission: ${data?.is_admitted ? 'Yes' : 'No'}`,
												alignment: 'left',
												colSpan: 2,
											},
											{},
										],
										[
											{
												text: `Commencement Date: ${data?.commencement_date ? format(data?.commencement_date, 'dd-MM-yyyy') : ''}`,
												alignment: 'left',
												colSpan: 2,
											},
											{},
										],
									],
								},
								layout: customTable,
							},
						],
					],
				},
			},
			{ text: '\n' },

			{
				table: {
					widths: [10, '*'],
					body: [
						[
							{
								text: 'Personal Details (Block Letter)',
								bold: true,
								fontSize: DEFAULT_FONT_SIZE + 4,
								style: 'tableHeader',
								colSpan: 2,
							},
							{},
						],
						[
							{ text: '1.' },
							{
								text: `Name (as in SSC Certificate): ${data?.applicant_name.toUpperCase()}`,
								alignment: 'left',
							},
						],
						[
							{ text: '2.' },
							{
								text: `Father's Name: ${data?.father_name.toUpperCase()}`,
								alignment: 'left',
							},
						],
						[
							{ text: '3.' },
							{
								text: `Mother's Name: ${data?.mother_name.toUpperCase()}`,
								alignment: 'left',
							},
						],
						[
							{ text: '4.' },
							{
								text: `Name of Local/Legal Guardian: ${data?.local_guardian.toUpperCase()}`,
								alignment: 'left',
							},
						],
						[
							{ text: '5.' },
							{
								text: `Date of Birth: ${getDateFormate(data?.date_of_birth)}`,
								alignment: 'left',
							},
						],
					],
				},
				layout: customTable,
			},
			{
				table: {
					widths: [10, 50, 25, 40, 25, 40],
					body: [
						[
							{ text: '6.' },
							{
								text: `Gender:`,
							},
							{
								svg: data?.gender === 'Male' ? checkBox : checkWithoutBox,
								width: 30,
								height: 20,
								alignment: 'left',
							},
							{
								text: `Male`,
								alignment: 'left',
							},
							{
								svg: data?.gender === 'Female' ? checkBox : checkWithoutBox,
								width: 30,
								height: 20,
								alignment: 'left',
							},
							{
								text: `Female`,
								alignment: 'left',
							},
						],
					],
				},
				layout: customTable,
			},
			{
				table: {
					widths: [10, '*'],
					body: [
						[
							{ text: '7.' },
							{
								text: `Marital Status: ${data?.marital_status}`,
								alignment: 'left',
							},
						],
					],
				},
				layout: customTable,
			},
			{
				table: {
					widths: [16, '*', '*'],
					body: [
						[
							{ text: '8.', rowSpan: 4 },
							{
								text: `A) Present Address for Corresponding`,
								alignment: 'left',
							},
							{
								text: `B) Permanent Address (if Different)`,
							},
						],
						[
							{},
							{ text: data?.present_address.toUpperCase(), rowSpan: 3 },

							{
								text: `Vill: ${data?.village.toUpperCase()}`,
							},
						],
						[
							{},
							{},
							{
								text: `Post: ${data?.post_office.toUpperCase()}`,
							},
						],
						[
							{},
							{},
							{
								text: `Thana: ${data?.thana.toUpperCase()}`,
							},
						],
						[
							{},
							{
								text: `Parents Phone/Cell: ${data?.parents_phone}`,
								alignment: 'left',
							},
							{
								text: `Dist: ${data?.district.toUpperCase()}`,
							},
						],

						[
							{},
							{
								text: `E-mail: ${data?.email}`,
							},
							{
								text: `Phone/Cell: ${data?.phone_number}`,
								alignment: 'left',
							},
						],
						[
							{},
							{
								text: `Local Guardian Phone/Cell: ${data?.local_guardian_phone}`,
								alignment: 'left',
							},
							{},
						],
						[
							{ text: '9.' },
							{
								text: `A) Nationality: ${data?.nationality}`,
								alignment: 'left',
							},
							{
								text: `B) NID No: ${data?.nid_number} `,
							},
						],
						[
							{},
							{},
							{
								text: `C) Birth Certificate No: ${data?.birth_certificate_number} `,
							},
						],
						// [
						// 	{ text: '10.' },
						// 	{
						// 		text: `Religion:`,
						// 		alignment: 'left',
						// 	},
						// 	{},
						// ],
					],
				},
				layout: customTable,
			},
			{
				table: {
					widths: [16, 150, '*'],
					body: [
						[
							{ text: '10.' },
							{
								text: `Intended Program of Study`,
								alignment: 'left',
							},
							{ text: 'i) 1st Preference: ' },
						],
						[{}, {}, { text: 'ii) 2nd Preference: ' }],
					],
				},
				layout: customTable,
			},
			{
				table: {
					widths: [16, '*', '*'],
					body: [
						[
							{ text: '11.', rowSpan: 3 },
							{
								text: `Credit Transfer (if applicable):`,
								alignment: 'left',
							},
							{},
						],
						[{}, { text: `Name of institution attended:` }, {}],
						[
							{},
							{ text: `Credit Completed:`, bold: true },
							{ text: '(Credit Transfer From to be attached)', alignment: 'right' },
						],
						[{ text: '', pageBreak: 'after' }, {}, {}],
						[{ text: '12.' }, { text: `Academic Qualifications:`, bold: true }, {}],
					],
				},
				layout: customTable,
			},
			{ text: '\n' },
			{
				table: {
					widths: ['*', '*', '*', '*', '*'],
					body: [
						[
							{ text: 'Name of Institution', style: 'tableHeader' },
							{ text: 'Board/University', style: 'tableHeader' },
							{ text: 'Certificate/Degree Obtained', style: 'tableHeader' },
							{ text: 'Year of Passing', style: 'tableHeader' },
							{ text: 'Division/Grade', style: 'tableHeader' },
						],
						[
							{ text: `${data?.ssc_institute.toUpperCase()}` },
							{ text: `${data?.ssc_board.toUpperCase()}` },
							{ text: `${data?.ssc_grade.toUpperCase()}` },
							{ text: `${data?.ssc_passing_year}` },
							{ text: `${data?.ssc_gpa}` },
						],
						[
							{ text: `${data?.hsc_institute.toUpperCase()}` },
							{ text: `${data?.hsc_board.toUpperCase()}` },
							{ text: `${data?.hsc_grade.toUpperCase()}` },
							{ text: `${data?.hsc_passing_year}` },
							{ text: `${data?.hsc_gpa}` },
						],
						...(data?.bsc_name
							? [
									[
										{ text: `${data?.bsc_institute?.toUpperCase() || ''}` },
										{},
										{ text: `${data?.bsc_name.toUpperCase()}` },
										{ text: `${data?.bsc_passing_year || ''}` },
										{ text: `${data?.bsc_cgpa || ''}` },
									],
								]
							: []),
					],
				},
			},
			{ text: '\n' },
			{
				table: {
					widths: [16, '*'],
					body: [
						[
							{ text: '13.', rowSpan: 2 },
							{
								text: 'I declare that, to the best of my knowledge, the information provided me, is true and completed.\n I acknowledge that EUB may change, any decision regrading admission or enrolment made on the basic of incorrect or incomplete information provided by me. ',
								alignment: 'justify',
							},
						],
						[
							{ text: '' },
							{
								text: 'I understand the above conditions and accept those in full. My sponsor or my self will be personally responsible for the cost of the academic program for which I am seeking admission as well as for associated travel and living costs. I shall abide by all the rules and regulations of the university.',
								alignment: 'justify',
							},
						],
					],
				},
				layout: customTable,
			},
			{ text: '\n\n' },
			{
				table: {
					widths: [16, '*', '*'],
					body: [
						[
							{},
							{
								text: 'Signature of Applicant',
								decoration: 'overline',
								decorationStyle: 'dotted',
							},
							{ text: 'Signature of Guardian', decoration: 'overline', decorationStyle: 'dotted' },
						],
						[
							{},
							{
								text: `Date:`,
							},
							{
								text: `Date:`,
							},
						],
					],
				},
				layout: customTable,
			},
			{
				table: {
					widths: [16, 100, 180, 20, 80, 20, 100],
					body: [
						[
							{ text: '14.', rowSpan: 2 },
							{ text: 'Admission Process:' },
							{ text: '(i) Interview and referred by:', colSpan: 4 },
							{},
							{},
							{},
							{},
						],
						[
							{},
							{},
							{
								text: `(ii) Recommendation by Department: `,
							},
							{
								svg: checkWithoutBox,
								width: 30,
								height: 20,
								alignment: 'left',
							},
							{
								text: `Recommended:`,
							},
							{
								svg: checkWithoutBox,
								width: 30,
								height: 20,
								alignment: 'left',
							},
							{ text: 'Not Recommended:' },
						],
					],
				},
				layout: customTable,
			},
			{
				table: {
					widths: [16, 25, 50, 25, 70],
					body: [
						[{ text: '15.', rowSpan: 2 }, { text: 'Decision:', colSpan: 2 }, {}, {}, {}],
						[
							{},
							{
								svg: checkWithoutBox,
								width: 30,
								height: 20,
								alignment: 'left',
							},
							{ text: 'Approved' },

							{
								svg: checkWithoutBox,
								width: 30,
								height: 20,
								alignment: 'left',
							},
							{
								text: `Not Approved`,
							},
						],
					],
				},
				layout: customTable,
			},
			{ text: '\n\n' },
			{
				table: {
					widths: [16, '*', 20, 200],
					body: [
						[
							{},
							{
								text: 'Signature of Director/Dy.Director, Admission Affairs',
								decoration: 'overline',
								decorationStyle: 'dotted',
							},
							{},
							{ text: 'Signature of Registrar', decoration: 'overline', decorationStyle: 'dotted' },
						],
						[
							{},
							{
								text: `Date:`,
							},
							{},
							{
								text: `Date:`,
							},
						],
					],
				},
				layout: customTable,
			},
		],
	});

	return pdfDocGenerator;
}
