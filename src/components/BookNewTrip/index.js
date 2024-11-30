import {Component} from 'react'
import {HiOutlineExclamationCircle} from 'react-icons/hi2'
import {v4} from 'uuid'
import TravelTripContextValue from '../../context/TravelTripContextValue'

import Header from '../Header'

import './index.css'

const stepsList = [
  {stepId: 'YOUR_DETAILS', displayText: 'Your Details', step: 1},
  {stepId: 'DATE_SELECTION', displayText: 'Date Selection', step: 2},
  {stepId: 'GUESTS', displayText: 'Guests', step: 3},
  {stepId: 'TRAVEL_ASSISTANCE', displayText: 'Travel Assistance', step: 4},
  {stepId: 'CONFIRMATION', displayText: 'Confirmation', step: 5},
]

const travelAssistanceList = [
  {value: 'car', displayText: 'Car'},
  {value: 'flight', displayText: 'Flight'},
  {value: 'bus', displayText: 'Bus'},
  {value: 'train', displayText: 'Train'},
]

class BookNewTrip extends Component {
  state = {
    onSelectedStep: stepsList[0].stepId,
    yourDetailsName: '',
    yourDetailsNameErrorMsg: false,
    yourDetailsStartLocation: '',
    yourDetailsStartLocationErrorMsg: false,
    yourDetailsEndLocation: '',
    yourDetailsEndLocationErrorMsg: false,
    startDateInput: '',
    endDateInput: '',
    startDateInputErrorMsg: false,
    endDateInputErrorMsg: false,
    endDateLessThanError: false,
    adultsCount: 1,
    childrensCount: 0,
    infantsCount: 0,
    isTravelAssitanceCheckboxChecked: false,
    selectedTripValue: travelAssistanceList[0].value,
    isCompletedStepList: [],
  }

  render() {
    const {onSelectedStep, isCompletedStepList} = this.state
    return (
      <TravelTripContextValue.Consumer>
        {value => {
          const {addTripList} = value
          const onClickYourDetailsNextBtn = () => {
            const {
              yourDetailsName,
              yourDetailsStartLocation,
              yourDetailsEndLocation,
            } = this.state
            if (yourDetailsName === '') {
              this.setState({yourDetailsNameErrorMsg: true})
            } else if (yourDetailsStartLocation === '') {
              this.setState({yourDetailsStartLocationErrorMsg: true})
            } else if (yourDetailsEndLocation === '') {
              this.setState({yourDetailsEndLocationErrorMsg: true})
            } else {
              this.setState({
                onSelectedStep: stepsList[1].stepId,
                isCompletedStepList: [stepsList[0].stepId],
              })
            }
          }

          const onChangeYourDetailsName = event => {
            this.setState({
              yourDetailsNameErrorMsg: false,
              yourDetailsName: event.target.value,
            })
          }

          const onChangeYourDetailsStartLocation = event => {
            this.setState({
              yourDetailsStartLocationErrorMsg: false,
              yourDetailsStartLocation: event.target.value,
            })
          }

          const onChangeYourDetailsEndLocation = event => {
            this.setState({
              yourDetailsEndLocationErrorMsg: false,
              yourDetailsEndLocation: event.target.value,
            })
          }

          const onClickPreviousInDateSelection = () => {
            this.setState(prevState => ({
              onSelectedStep: stepsList[0].stepId,
              isCompletedStepList: prevState.isCompletedStepList.filter(
                eachCompletedList =>
                  eachCompletedList.includes(stepsList[0].stepId) === false,
              ),
            }))
          }

          const onChangeStartDateInput = event => {
            this.setState({
              startDateInput: event.target.value,
              startDateInputErrorMsg: false,
            })
            const {startDateInput} = this.state
            console.log(startDateInput)
          }

          const onChangeEndDateInput = event => {
            this.setState({
              endDateInput: event.target.value,
              endDateInputErrorMsg: false,
            })
          }

          const onClickPreviousInGuestForm = () => {
            this.setState(prevState => ({
              onSelectedStep: stepsList[1].stepId,
              isCompletedStepList: prevState.isCompletedStepList.filter(
                eachCompletedList =>
                  eachCompletedList.includes(stepsList[1].stepId) === false,
              ),
            }))
          }

          const onClickDateSelectionNextBtn = () => {
            const {startDateInput, endDateInput} = this.state
            const getDifference = startDateInput < endDateInput
            console.log(getDifference)
            if (startDateInput === '') {
              this.setState({startDateInputErrorMsg: true})
            } else if (endDateInput === '') {
              this.setState({endDateInputErrorMsg: true})
            } else if (!getDifference) {
              this.setState({endDateLessThanError: true})
            } else {
              this.setState(prevState => ({
                onSelectedStep: stepsList[2].stepId,
                isCompletedStepList: [
                  ...prevState.isCompletedStepList,
                  stepsList[1].stepId,
                ],
              }))
            }
          }

          const onClickAdultsDecreaseBtn = () => {
            const {adultsCount} = this.state
            if (adultsCount > 1) {
              this.setState(prevState => ({
                adultsCount: prevState.adultsCount - 1,
              }))
            }
          }

          const onClickAdultsIncreaseBtn = () => {
            this.setState(prevState => ({
              adultsCount: prevState.adultsCount + 1,
            }))
          }

          const onClickChildrensDecreaseBtn = () => {
            const {childrensCount} = this.state
            if (childrensCount > 0) {
              this.setState(prevState => ({
                childrensCount: prevState.childrensCount - 1,
              }))
            }
          }

          const onClickChildrensIncreaseBtn = () => {
            this.setState(prevState => ({
              childrensCount: prevState.childrensCount + 1,
            }))
          }

          const onClickInfantsDecreaseBtn = () => {
            const {infantsCount} = this.state
            if (infantsCount > 0) {
              this.setState(prevState => ({
                infantsCount: prevState.infantsCount - 1,
              }))
            }
          }

          const onClickInfantsIncreaseBtn = () => {
            this.setState(prevState => ({
              infantsCount: prevState.infantsCount + 1,
            }))
          }

          const onClickGuestNextBtn = () => {
            this.setState(prevState => ({
              onSelectedStep: stepsList[3].stepId,
              isCompletedStepList: [
                ...prevState.isCompletedStepList,
                stepsList[2].stepId,
              ],
            }))
          }

          const onChangeTravelAssistanceCheckbox = () => {
            this.setState(prevState => ({
              isTravelAssitanceCheckboxChecked:
                !prevState.isTravelAssitanceCheckboxChecked,
            }))
          }

          const onChangeSelectTripValue = event => {
            this.setState({selectedTripValue: event.target.value})
          }

          const onClickPreviousInTravelAssistance = () => {
            this.setState(prevState => ({
              onSelectedStep: stepsList[2].stepId,
              isCompletedStepList: prevState.isCompletedStepList.filter(
                eachCompletedList =>
                  eachCompletedList.includes(stepsList[2].stepId) === false,
              ),
            }))
          }

          const onClickTravelAssistanceNextBtn = () => {
            const {isTravelAssitanceCheckboxChecked} = this.state
            if (!isTravelAssitanceCheckboxChecked) {
              this.setState(prevState => ({
                onSelectedStep: stepsList[4].stepId,
                isCompletedStepList: [
                  ...prevState.isCompletedStepList,
                  stepsList[3].stepId,
                ],
              }))
            } else {
              this.setState(prevState => ({
                onSelectedStep: stepsList[4].stepId,
                isCompletedStepList: [
                  ...prevState.isCompletedStepList,
                  stepsList[3].stepId,
                ],
              }))
            }
          }

          const onClickCancelBookingBtn = () => {
            this.setState({
              onSelectedStep: stepsList[0].stepId,
              yourDetailsName: '',
              yourDetailsNameErrorMsg: false,
              yourDetailsStartLocation: '',
              yourDetailsStartLocationErrorMsg: false,
              yourDetailsEndLocation: '',
              yourDetailsEndLocationErrorMsg: false,
              startDateInput: '',
              endDateInput: '',
              startDateInputErrorMsg: false,
              endDateInputErrorMsg: false,
              adultsCount: 1,
              childrensCount: 0,
              infantsCount: 0,
              isTravelAssitanceCheckboxChecked: false,
              selectedTripValue: travelAssistanceList[0].value,
              isCompletedStepList: [],
            })
          }

          const onClickConfirmBookingBtn = () => {
            const {yourDetailsEndLocation, startDateInput, endDateInput} =
              this.state
            const tripsDetails = {
              id: v4(),
              endLocation: yourDetailsEndLocation,
              startDate: startDateInput,
              endDate: endDateInput,
            }
            this.setState(prevState => ({
              onSelectedStep: '',
              isCompletedStepList: [
                ...prevState.isCompletedStepList,
                stepsList[4].stepId,
              ],
            }))
            addTripList(tripsDetails)
          }

          const onClickBookANewTrip = event => {
            event.preventDefault()
            this.setState({
              onSelectedStep: stepsList[0].stepId,
              yourDetailsName: '',
              yourDetailsNameErrorMsg: false,
              yourDetailsStartLocation: '',
              yourDetailsStartLocationErrorMsg: false,
              yourDetailsEndLocation: '',
              yourDetailsEndLocationErrorMsg: false,
              startDateInput: '',
              endDateInput: '',
              startDateInputErrorMsg: false,
              endDateInputErrorMsg: false,
              adultsCount: 1,
              childrensCount: 0,
              infantsCount: 0,
              isTravelAssitanceCheckboxChecked: false,
              selectedTripValue: travelAssistanceList[0].value,
              isCompletedStepList: [],
            })
          }

          const onSubmitGuestForm = event => {
            event.preventDefault()
          }

          const onSubmitYourDetailsForm = event => {
            event.preventDefault()
          }

          const onSubmitDateSelectionForm = event => {
            event.preventDefault()
          }

          const onSubmitTravelAssistanceForm = event => {
            event.preventDefault()
          }

          const onSubmitConfirmationPage = event => {
            event.preventDefault()
          }

          // Your Details Step

          const renderYourDetailsForm = () => {
            const {
              yourDetailsNameErrorMsg,
              yourDetailsStartLocationErrorMsg,
              yourDetailsEndLocationErrorMsg,
              yourDetailsName,
              yourDetailsStartLocation,
              yourDetailsEndLocation,
            } = this.state
            return (
              <form
                onSubmit={onSubmitYourDetailsForm}
                className="your-details-container"
              >
                <h1 className="your-details-heading">Travel Trip</h1>
                <h1 className="your-details-heading">Your Details</h1>
                <p className="your-details-description">
                  Enter your name and location details
                </p>
                <div className="your-details-form-container">
                  <label className="your-details-label-text" htmlFor="name">
                    Name
                  </label>
                  {!yourDetailsNameErrorMsg && (
                    <div className="your-details-input-container">
                      <input
                        value={yourDetailsName}
                        onChange={onChangeYourDetailsName}
                        placeholder="Enter name"
                        className="your-details-input-field"
                        id="name"
                        type="text"
                      />
                    </div>
                  )}
                  {yourDetailsNameErrorMsg && (
                    <>
                      <div className="your-details-input-container-error">
                        <input
                          value={yourDetailsName}
                          onChange={onChangeYourDetailsName}
                          placeholder="Enter name"
                          className="your-details-input-field-error"
                          id="name"
                          type="text"
                        />
                        <HiOutlineExclamationCircle className="error-icon" />
                      </div>
                      <p className="name-error-text">Enter your name</p>
                    </>
                  )}

                  <label
                    className="your-details-label-text"
                    htmlFor="startLocation"
                  >
                    Start location
                  </label>
                  {!yourDetailsStartLocationErrorMsg && (
                    <div className="your-details-input-container">
                      <input
                        value={yourDetailsStartLocation}
                        onChange={onChangeYourDetailsStartLocation}
                        placeholder="Enter Start Location"
                        className="your-details-input-field"
                        id="startLocation"
                        type="text"
                      />
                    </div>
                  )}
                  {yourDetailsStartLocationErrorMsg && (
                    <>
                      <div className="your-details-input-container-error">
                        <input
                          value={yourDetailsStartLocation}
                          onChange={onChangeYourDetailsStartLocation}
                          placeholder="Enter Start Location"
                          className="your-details-input-field-error"
                          id="startLocation"
                          type="text"
                        />
                        <HiOutlineExclamationCircle className="error-icon" />
                      </div>
                      <p className="name-error-text">
                        Enter your start location
                      </p>
                    </>
                  )}
                  <label
                    className="your-details-label-text"
                    htmlFor="endLocation"
                  >
                    End location
                  </label>
                  {!yourDetailsEndLocationErrorMsg && (
                    <div className="your-details-input-container">
                      <input
                        value={yourDetailsEndLocation}
                        onChange={onChangeYourDetailsEndLocation}
                        placeholder="Enter End Location"
                        className="your-details-input-field"
                        id="endLocation"
                        type="text"
                      />
                    </div>
                  )}
                  {yourDetailsEndLocationErrorMsg && (
                    <>
                      <div className="your-details-input-container-error">
                        <input
                          value={yourDetailsEndLocation}
                          onChange={onChangeYourDetailsEndLocation}
                          placeholder="Enter End Location"
                          className="your-details-input-field-error"
                          id="sendLocation"
                          type="text"
                        />
                        <HiOutlineExclamationCircle className="error-icon" />
                      </div>
                      <p className="name-error-text">Enter your End Location</p>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={onClickYourDetailsNextBtn}
                    className="your-details-next-button"
                  >
                    Next
                  </button>
                </div>
              </form>
            )
          }

          // Date Selection Step
          const renderDateSelectionForm = () => {
            const {
              startDateInput,
              endDateInput,
              startDateInputErrorMsg,
              endDateInputErrorMsg,
              endDateLessThanError,
            } = this.state
            return (
              <form
                onSubmit={onSubmitDateSelectionForm}
                className="your-details-container"
              >
                <h1 className="your-details-heading">Date Selection</h1>
                <p className="your-details-description">
                  Select your Start and End Date.
                </p>
                <div className="your-details-form-container">
                  <label
                    className="your-details-label-text"
                    htmlFor="startDate"
                  >
                    Start Date
                  </label>
                  {startDateInputErrorMsg ? (
                    <>
                      <input
                        onChange={onChangeStartDateInput}
                        id="startDate"
                        className="date-input-field-error-msg"
                        type="date"
                        value={startDateInput}
                      />
                      <p className="start-date-error-msg">Select start date</p>
                    </>
                  ) : (
                    <input
                      onChange={onChangeStartDateInput}
                      id="startDate"
                      className="date-input-field"
                      type="date"
                      value={startDateInput}
                    />
                  )}
                  <label className="your-details-label-text" htmlFor="endDate">
                    End Date
                  </label>
                  {endDateInputErrorMsg || endDateLessThanError ? (
                    <>
                      <input
                        onChange={onChangeEndDateInput}
                        id="endDate"
                        className="date-input-field-error-msg"
                        type="date"
                        value={endDateInput}
                      />
                      {endDateInputErrorMsg && (
                        <p className="start-date-error-msg">Select end date</p>
                      )}
                      {endDateLessThanError && (
                        <p className="start-date-error-msg">
                          The end date cannot be less than the start date
                        </p>
                      )}
                    </>
                  ) : (
                    <input
                      onChange={onChangeEndDateInput}
                      id="endDate"
                      className="date-input-field"
                      type="date"
                      value={endDateInput}
                    />
                  )}
                  <div className="button-container">
                    <button
                      onClick={onClickPreviousInDateSelection}
                      type="button"
                      className="date-previous-btn"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={onClickDateSelectionNextBtn}
                      className="your-details-next-button"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </form>
            )
          }

          // Guests Selection Step
          const renderGuestForm = () => {
            const {adultsCount, childrensCount, infantsCount} = this.state
            return (
              <form
                onSubmit={onSubmitGuestForm}
                className="your-details-container"
              >
                <h1 className="your-details-heading">Guests</h1>
                <p className="your-details-description">Select your guests</p>
                <div className="your-details-form-container">
                  <div className="adults-guest-container">
                    <div className="adults-content-container">
                      <p className="adults-text">Adults</p>
                      <p className="adults-category-description">
                        Age 13 or above
                      </p>
                    </div>
                    <div className="increase-decrease-container">
                      <button
                        onClick={onClickAdultsDecreaseBtn}
                        className="decrease-button"
                        type="button"
                      >
                        -
                      </button>
                      <p className="adults-count-text">{adultsCount}</p>
                      <button
                        onClick={onClickAdultsIncreaseBtn}
                        className="decrease-button"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <hr className="adults-bottom-horizontal-line" />

                  <div className="adults-guest-container">
                    <div className="adults-content-container">
                      <p className="adults-text">Children</p>
                      <p className="adults-category-description">Age 2-12</p>
                    </div>
                    <div className="increase-decrease-container">
                      <button
                        onClick={onClickChildrensDecreaseBtn}
                        className="decrease-button"
                        type="button"
                      >
                        -
                      </button>
                      <p className="adults-count-text">{childrensCount}</p>
                      <button
                        onClick={onClickChildrensIncreaseBtn}
                        className="decrease-button"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <hr className="adults-bottom-horizontal-line" />

                  <div className="adults-guest-container">
                    <div className="adults-content-container">
                      <p className="adults-text">Infants</p>
                      <p className="adults-category-description">Under 2</p>
                    </div>
                    <div className="increase-decrease-container">
                      <button
                        onClick={onClickInfantsDecreaseBtn}
                        className="decrease-button"
                        type="button"
                      >
                        -
                      </button>
                      <p className="adults-count-text">{infantsCount}</p>
                      <button
                        onClick={onClickInfantsIncreaseBtn}
                        className="decrease-button"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="button-container">
                    <button
                      onClick={onClickPreviousInGuestForm}
                      type="button"
                      className="date-previous-btn"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={onClickGuestNextBtn}
                      className="your-details-next-button"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </form>
            )
          }

          // Travel Assistance
          const renderTravelAssistanceForm = () => {
            const {isTravelAssitanceCheckboxChecked, selectedTripValue} =
              this.state
            return (
              <form
                onSubmit={onSubmitTravelAssistanceForm}
                className="your-details-container"
              >
                <h1 className="your-details-heading">Travel Assistance</h1>
                <p className="your-details-description">
                  Select your Travel Assistance.
                </p>
                <div className="your-details-form-container">
                  <div className="checkbox-container">
                    {isTravelAssitanceCheckboxChecked ? (
                      <input
                        className="input-checkbox"
                        checked
                        onChange={onChangeTravelAssistanceCheckbox}
                        id="checkbox"
                        type="checkbox"
                      />
                    ) : (
                      <input
                        className="input-checkbox"
                        onChange={onChangeTravelAssistanceCheckbox}
                        id="checkbox"
                        type="checkbox"
                      />
                    )}
                    <label className="checkbox-label" htmlFor="checkbox">
                      Travel Assistance Needed
                    </label>
                  </div>
                  {isTravelAssitanceCheckboxChecked && (
                    <div className="select-container">
                      <label className="select-label" htmlFor="select">
                        Travel Assistance
                      </label>
                      <select
                        id="select"
                        className="select-input"
                        onChange={onChangeSelectTripValue}
                        value={selectedTripValue}
                      >
                        {travelAssistanceList.map(eachTravel => (
                          <option
                            value={eachTravel.displayText}
                            key={eachTravel.value}
                          >
                            {eachTravel.displayText}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="button-container">
                    <button
                      onClick={onClickPreviousInTravelAssistance}
                      type="button"
                      className="date-previous-btn"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={onClickTravelAssistanceNextBtn}
                      className="your-details-next-button"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </form>
            )
          }

          // Confirmation Page
          const renderConfirmationForm = () => {
            const {
              yourDetailsName,
              yourDetailsStartLocation,
              yourDetailsEndLocation,
              startDateInput,
              endDateInput,
              adultsCount,
              childrensCount,
              infantsCount,
              selectedTripValue,
            } = this.state
            return (
              <form
                onSubmit={onSubmitConfirmationPage}
                className="your-details-container"
              >
                <h1 className="your-details-heading">Confirmation</h1>
                <p className="your-details-description">Confirm your details</p>
                <div className="your-details-form-container">
                  <div className="confirmation-name-container">
                    <p className="name-heading">Name:</p>
                    <p className="confirmed-name">{yourDetailsName}</p>
                  </div>
                  <div className="confirmation-name-container">
                    <p className="name-heading">Start Location:</p>
                    <p className="confirmed-name">{yourDetailsStartLocation}</p>
                  </div>
                  <div className="confirmation-name-container">
                    <p className="name-heading">End Location:</p>
                    <p className="confirmed-name">{yourDetailsEndLocation}</p>
                  </div>
                  <div className="confirmation-name-container">
                    <p className="name-heading">Start Date:</p>
                    <p className="confirmed-name">{startDateInput}</p>
                  </div>
                  <div className="confirmation-name-container">
                    <p className="name-heading">End Date:</p>
                    <p className="confirmed-name">{endDateInput}</p>
                  </div>
                  <div className="confirmation-name-container">
                    <p className="name-heading">Guests:</p>
                    <p className="confirmed-name">
                      {adultsCount + childrensCount + infantsCount}
                    </p>
                  </div>
                  <div className="confirmation-name-container">
                    <p className="name-heading">Travel Assistance:</p>
                    <p className="confirmed-name">{selectedTripValue}</p>
                  </div>
                  <div className="button-container">
                    <button
                      onClick={onClickCancelBookingBtn}
                      type="button"
                      className="date-previous-btn"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={onClickConfirmBookingBtn}
                      className="your-details-next-button"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </form>
            )
          }

          // Confirmed Page
          const renderConfirmedBookingForm = () => (
            <div className="confirmed-form-container-lg">
              <form
                onSubmit={onClickBookANewTrip}
                className="confirmed-page-container"
              >
                <img
                  className="confirmed-image"
                  src="https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png"
                  alt="success"
                />
                <h1 className="awesome-text">Awesome!</h1>
                <p className="booking-confirmed-description">
                  Your booking has been confirmed.
                </p>
                <button className="book-a-new-trip-button" type="submit">
                  Book a New Trip
                </button>
              </form>
            </div>
          )

          const renderBookNowSteps = () => {
            switch (onSelectedStep) {
              case stepsList[0].stepId:
                return renderYourDetailsForm()
              case stepsList[1].stepId:
                return renderDateSelectionForm()
              case stepsList[2].stepId:
                return renderGuestForm()
              case stepsList[3].stepId:
                return renderTravelAssistanceForm()
              case stepsList[4].stepId:
                return renderConfirmationForm()
              default:
                return renderConfirmedBookingForm()
            }
          }
          return (
            <div className="book-a-new-trip-container-sm">
              <Header className="header" />
              <div className="book-a-new-trip-content-container">
                <div className="book-a-new-trip-steps-container-lg">
                  <div className="left-container-lg">
                    <ul className="steps-list-container">
                      {stepsList.map(eachStep => {
                        const SelectedBackgroundColor =
                          eachStep.stepId === onSelectedStep
                            ? 'horizontal-line horizontal-line-background-color'
                            : 'horizontal-line'
                        return (
                          <li
                            className="horizontal-line-item"
                            key={eachStep.stepId}
                          >
                            <hr className={SelectedBackgroundColor} />
                          </li>
                        )
                      })}
                    </ul>
                    <ul className="steps-list-container-lg">
                      {stepsList.map(eachStep => {
                        const SelectedBackgroundColor =
                          eachStep.stepId === onSelectedStep
                            ? 'steps-count-lg steps-selected-count-lg'
                            : 'steps-count-lg'
                        const selectedDisplayTextColor =
                          eachStep.stepId === onSelectedStep
                            ? 'steps-display-text-lg steps-selected-display-text-lg'
                            : 'steps-display-text-lg'
                        const isCompleted = isCompletedStepList.includes(
                          eachStep.stepId,
                        )
                        return (
                          <li
                            className="steps-list-item-lg"
                            key={eachStep.stepId}
                          >
                            {isCompleted ? (
                              <img
                                className="completed-img"
                                src="https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png"
                                alt={eachStep.displayText}
                              />
                            ) : (
                              <p className={SelectedBackgroundColor}>
                                {eachStep.step}
                              </p>
                            )}
                            <p className={selectedDisplayTextColor}>
                              {eachStep.displayText}
                            </p>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <div className="right-container-lg">
                    {renderBookNowSteps()}
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </TravelTripContextValue.Consumer>
    )
  }
}

export default BookNewTrip
