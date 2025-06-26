import '../styles/main.css'
export default function Home() {
  return (
    <>
      <div className="column-flex">
        <div className="question-box">
          <div className="sidebar-header">
            <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>
              Post your own question!
            </h1>
          </div>
          <input type="text" placeholder="Question Title" />
          <input type="text" placeholder="Question Description" />
          <button
            style={{
              backgroundColor: 'white',
              fontWeight: 'bold',
              fontSize: '1.3rem',
              padding: '5px 30px',
              borderRadius: '10px',
            }}
          >
            Post!
          </button>
        </div>
        <div style={{ marginTop: '30px' }}>
          <div className="block">
            <div className="question-box-other">
              <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>
                Question title
              </h1>
              <div className="question-box-text">
                <p>
                  Question description blah blah blah blah blah blahblah
                  blahblah blah blah blah blah blah blah blah blah blah blah
                  blah
                </p>
              </div>
            </div>
            <div className="block">
              <div className="question-box-other">
                <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>
                  Question title
                </h1>
                <div className="question-box-text">
                  <p>
                    Question description blah blah blah blah blah blahblah
                    blahblah blah blah blah blah blah blah blah blah blah blah
                    blah blah blah blah blah blah blah blah blah blah blah blah
                    blah blah blah blah blah blah blah blah blah blah blah
                  </p>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="question-box-other">
                <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>
                  Question title
                </h1>
                <div className="question-box-text">
                  <p>
                    Question description blah blah blah blah blah blahblah
                    blahblah blah blah blah blah blah blah blah blah blah blah
                    blah
                  </p>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="question-box-other">
                <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>
                  Question title
                </h1>
                <div className="question-box-text">
                  <p>
                    Question description blah blah blah blah blah blahblah
                    blahblah blah blah blah blah blah blah blah blah blah blah
                    blah
                  </p>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="question-box-other">
                <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>
                  Question title
                </h1>
                <div className="question-box-text">
                  <p>
                    Question description blah blah blah blah blah blahblah
                    blahblah blah blah blah blah blah blah blah blah blah blah
                    blah
                  </p>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="question-box-other">
                <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>
                  Question title
                </h1>
                <div className="question-box-text">
                  <p>
                    Question description blah blah blah blah blah blahblah
                    blahblah blah blah blah blah blah blah blah blah blah blah
                    blah
                  </p>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="question-box-other">
                <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>
                  Question title
                </h1>
                <div className="question-box-text">
                  <p>
                    Question description blah blah blah blah blah blahblah
                    blahblah blah blah blah blah blah blah blah blah blah blah
                    blah
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
