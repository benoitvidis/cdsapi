/**
 * @typedef {{
 *  key: string
 *  url: string
 * }} CDSApiClientOptions
 */

/**
 * @typedef {{
 *  area: number[]
 *  day: ('1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'11'|'12'|'13'|'14'|'15'|'16'|'17'|'18'|'19'|'20'|'21'|'22'|'23'|'24'|'25'|'26'|'27'|'28'|'29'|'30'|'31')[]
 *  format: ('grib'|'netcdf')
 *  month: ('01'|'02'|'03'|'04'|'05'|'06'|'07'|'08'|'09'|'10'|'11'|'12')[]
 *  time: string[]
 *  variable: string[]
 *  year: string[]
 * }} CDSApiRequestOptions
 */

/**
 * @typedef {{
 *  request_id: string
 *  specific_metadata_json: Object
 *  state: ('completed'|'failed'|'queued'|'running')
 * }} CDSApiRequestState
 */
