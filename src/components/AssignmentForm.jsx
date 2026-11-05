
import { useState } from 'react';
import { students } from '../data/seedData';

function AssignmentForm({ onSave, onCancel, initialData }) {

  const [title, setTitle] = useState(
    initialData?.title || ''
  );

  const [description, setDescription] = useState(
    initialData?.description || ''
  );

  const [dueDate, setDueDate] = useState(
    initialData?.dueDate || ''
  );

  const [driveLink, setDriveLink] = useState(
    initialData?.driveLink || ''
  );

  const [assignToAll, setAssignToAll] = useState(
    initialData
      ? initialData.assignedStudentIds.length === students.length
      : true
  );

  const [selectedStudents, setSelectedStudents] = useState(
    initialData?.assignedStudentIds || students.map(s => s.id)
  );

  // Handle student selection
  function handleStudentChange(studentId) {

    setSelectedStudents((previous) => {

      if (previous.includes(studentId)) {

        return previous.filter(id => id !== studentId);

      }

      return [...previous, studentId];

    });

  }

  // Handle form submission
  function handleSubmit(event) {

    event.preventDefault();

    const assignedStudentIds = assignToAll
      ? students.map(student => student.id)
      : selectedStudents;

    if (assignedStudentIds.length === 0) {
      alert('Please select at least one student.');
      return;
    }

    const assignment = {
      title: title.trim(),
      description: description.trim(),
      dueDate,
      driveLink: driveLink.trim(),
      assignedStudentIds
    };

    onSave(assignment);

  }

  return (

    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">

      <h2 className="text-xl font-bold text-gray-800 mb-6">
        {initialData ? 'Edit Assignment' : 'Create Assignment'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Assignment Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Assignment Title
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder="Enter assignment title"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>

          <textarea
            id="description"
            value={description}
            onChange={event => setDescription(event.target.value)}
            placeholder="Enter assignment instructions"
            required
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
        </div>

        {/* Due Date */}
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
            Due Date
          </label>

          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={event => setDueDate(event.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
        </div>

        {/* Google Drive Link */}
        <div>
          <label htmlFor="driveLink" className="block text-sm font-medium text-gray-700 mb-2">
            Google Drive Link
          </label>

          <input
            id="driveLink"
            type="url"
            value={driveLink}
            onChange={event => setDriveLink(event.target.value)}
            placeholder="https://drive.google.com/..."
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          />
        </div>

        {/* Student Assignment */}
        <div className="border border-gray-200 rounded-lg p-4">

          <h3 className="font-semibold text-gray-800 mb-3">
            Assign To
          </h3>

          <label className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              checked={assignToAll}
              onChange={event => setAssignToAll(event.target.checked)}
              className="w-4 h-4"
            />

            <span className="text-sm font-medium text-gray-700">
              Assign to all students
            </span>
          </label>

          {!assignToAll && (

            <div className="space-y-3">

              <p className="text-sm text-gray-500">
                Select individual students:
              </p>

              {students.map(student => (

                <label
                  key={student.id}
                  className="flex items-center gap-3"
                >

                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleStudentChange(student.id)}
                    className="w-4 h-4"
                  />

                  <span className="text-sm text-gray-700">
                    {student.name}
                  </span>

                </label>

              ))}

            </div>

          )}

        </div>

        {/* Form Buttons */}
        <div className="flex flex-wrap justify-end gap-3">

          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {initialData ? 'Update Assignment' : 'Create Assignment'}
          </button>

        </div>

      </form>

    </div>

  );

}

export default AssignmentForm;
