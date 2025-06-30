export default function Profile() {
  return (
    <>
      <div className="user-dashboard">
        {/* User Info Section */}
        <div className="user-section">
          <div className="user-greeting">
            <h1>{`Hello ${'{User}'}`}</h1>
          </div>

          <div className="user-details-box">
            <h1>User details:</h1>
            <h2>
              Name: <input type="text" />
            </h2>
            <h2>
              Bio: <input type="text" />
            </h2>
            <button className="update-button">Update</button>
          </div>
        </div>

        {/* Past Solutions Section */}
        <div className="solutions-section">
          <h1>Past solutions</h1>

          <div className="solution-card">
            <h1>Title</h1>
            <p>
              Description blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah blah
            </p>
          </div>

          <div className="solution-card">
            <h1>Title</h1>
            <p>
              Description blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah blah
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
