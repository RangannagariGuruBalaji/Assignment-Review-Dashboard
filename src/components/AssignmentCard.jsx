
import { useState } from 'react';

function AssignmentCard({
  assignment,
  status,
  isAdmin,
  onSubmit,
  onEdit,
  onDelete
}) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationStep, setConfirmationStep] = useState(1);

  // Get today's date
  const today = new Date();

  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-');

  // Check overdue status
  const isOverdue = isAdmin
    ? assignment.dueDate < todayString &&
      Object.values(assignment.submissions).some(
        studentStatus => studentStatus !== 'submitted'
      )
    : status !== 'submitted' &&
      assignment.dueDate < todayString;

  // Status badge
  let statusText = 'Pending';
  let statusStyle = 'bg-yellow-100 text-yellow-700';

  if (status === 'submitted') {
    statusText = 'Submitted';
    statusStyle = 'bg-green-100 text-green-700';
  } else if (isOverdue) {
    statusText = 'Overdue';
    statusStyle = 'bg-red-100 text-red-700';
  }

  // Open confirmation
  function handleStartConfirmation() {
    setConfirmationStep(1);
    setShowConfirmation(true);
  }

  // Final submission
  function handleFinalConfirmation() {
    onSubmit(assignment.id);
    setShowConfirmation(false);
    setConfirmationStep(1);
  }

  // Cancel confirmation
  function handleCancelConfirmation() {
    setShowConfirmation(false);
    setConfirmationStep(1);
  }

  return (
    <>
      <article
        className={`bg-white rounded-xl border p-5 shadow-sm transition ${
          isOverdue
            ? 'border-red-300'
            : 'border-gray-200'
        }`}
        aria-label={`Assignment: ${assignment.title}`}
      >

        {/* Assignment heading and status */}
        <div className="flex justify-between items-start gap-3">

          <h3 className="text-lg font-bold text-gray-800">
            {assignment.title}
          </h3>

          <span
            role="status"
            className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${statusStyle}`}
          >
            {isAdmin
              ? isOverdue
                ? 'Overdue'
                : 'Active'
              : statusText}
          </span>

        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-3">
          {assignment.description}
        </p>

        {/* Due date */}
        <div className="mt-4">

          <p className="text-sm text-gray-500">
            Due Date:
          </p>

          <p
            className={`text-sm font-semibold mt-1 ${
              isOverdue
                ? 'text-red-600'
                : 'text-gray-800'
            }`}
          >
            {assignment.dueDate}

            {isOverdue && (
              <span className="ml-2 text-xs">
                (Deadline passed)
              </span>
            )}
          </p>

        </div>

        {/* Assignment link */}
        <div className="mt-4">

          <a
            href={assignment.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open assignment materials for ${assignment.title} in a new tab`}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Open Assignment Link
          </a>

        </div>

        {/* Admin actions */}
        {isAdmin && (
          <div className="flex flex-wrap gap-3 mt-5">

            <button
              type="button"
              onClick={() => onEdit(assignment)}
              aria-label={`Edit ${assignment.title}`}
              className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => onDelete(assignment.id)}
              aria-label={`Delete ${assignment.title}`}
              className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium"
            >
              Delete
            </button>

          </div>
        )}

        {/* Student submission action */}
        {!isAdmin && status !== 'submitted' && (
          <button
            type="button"
            onClick={handleStartConfirmation}
            className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Yes, I have submitted
          </button>
        )}

        {!isAdmin && status === 'submitted' && (
          <p
            role="status"
            className="text-green-600 text-sm font-semibold mt-5"
          >
            Assignment submitted successfully!
          </p>
        )}

      </article>

      {/* Accessible confirmation dialog */}
      {showConfirmation && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={handleCancelConfirmation}
        >

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmation-title"
            aria-describedby="confirmation-description"
            className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
            onClick={event => event.stopPropagation()}
          >

            {confirmationStep === 1 ? (

              <>
                <h2
                  id="confirmation-title"
                  className="text-xl font-bold text-gray-800"
                >
                  Confirm Submission
                </h2>

                <p
                  id="confirmation-description"
                  className="text-gray-600 mt-3"
                >
                  Have you completed and submitted the assignment
                  "{assignment.title}"?
                </p>

                <div className="flex flex-wrap justify-end gap-3 mt-6">

                  <button
                    type="button"
                    onClick={handleCancelConfirmation}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() => setConfirmationStep(2)}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Yes, Continue
                  </button>

                </div>
              </>

            ) : (

              <>
                <h2
                  id="confirmation-title"
                  className="text-xl font-bold text-gray-800"
                >
                  Final Confirmation
                </h2>

                <p
                  id="confirmation-description"
                  className="text-gray-600 mt-3"
                >
                  Please confirm that you have submitted this assignment.
                  Your status will be updated to Submitted.
                </p>

                <div className="flex flex-wrap justify-end gap-3 mt-6">

                  <button
                    type="button"
                    onClick={handleCancelConfirmation}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Go Back
                  </button>

                  <button
                    type="button"
                    onClick={handleFinalConfirmation}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Confirm Submission
                  </button>

                </div>
              </>

            )}

          </div>

        </div>
      )}

    </>
  );
}

export default AssignmentCard;
