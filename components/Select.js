import React from 'react'

/**
 * Drop down radio button
 */
class Select extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const { onChange } = this.props
    onChange(event.target.value)
  }

  render() {
    return (
      <div className="py-1 space-x-3">
        <label className="text-neutral-500">{this.props.label}</label>
        <select
          value={this.props.value}
          onChange={this.handleChange}
          className="border p-1 rounded cursor-pointer"
        >
          {this.props.options?.map(o => (
            <option key={o.value} value={o.value}>
              {o.text}
            </option>
          ))}
        </select>
      </div>
    )
  }
}
Select.defaultProps = {
  label: '',
  value: '1',
  options: [
    { value: '1', text: '옵션 1' },
    { value: '2', text: '옵션 2' }
  ]
}
export default Select
