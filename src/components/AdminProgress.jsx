import { students } from '../data/seedData';

function AdminProgress({ assignments }) {
  return (
    <div className="space-y-5">
      {assignments.map((assignment) => {
        // Get the students assigned to this assignment
        const assignedStudents = assignment.assignedStudentIds
          .map((studentId) =>
            students.find((student) => student.id === studentId)
          )
          .filter(Boolean);

        // Count submitted assignments
        const submittedCount = assignedStudents.filter(
          (student) =>
            assignment.submissions[student.id] === 'submitted'
        ).length;

        // Total assigned students
        const totalStudents = assignedStudents.length;

        // Calculate percentage
        const progress = totalStudents
          ? Math.round((submittedCount / totalStudents) * 100)
          : 0;

        return (
          <div
            key={assignment.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
          >
            <div className="flex justify-between items-center gap-3">
              <div>
                <h3 className="font-semibold text-gray-800">
                  {assignment.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {submittedCount} of {totalStudents} students submitted
                </p>
              </div>

              <span className="font-bold text-blue-600">
                {progress}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Individual student status */}
            <div className="mt-5 space-y-3">
              {assignedStudents.map((student) => {
                const status =
                  assignment.submissions[student.id] || 'not_submitted';

                return (
                  <div
                    key={student.id}
                    className="flex justify-between items-center border-t border-gray-100 pt-3"
                  >
                    <p className="text-sm font-medium text-gray-700">
                      {student.name}
                    </p>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        status === 'submitted'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {status === 'submitted' ? 'Submitted' : 'Pending'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AdminProgress;