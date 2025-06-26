export default function MessageBox() {
  const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <>
      <div style={{ display: 'flex', marginTop: '10vh' }}>
        <div
          style={{
            backgroundColor: 'gray',
            width: '50vw',
            padding: '30px',
            borderRadius: '20px',
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '90%',
              overflowY: 'scroll',
              scrollbarWidth: 'none',
              scrollBehavior: 'smooth',
              width: '100%',
            }}
          >
            {testArr.map(() => {
              //Doing this so that I can test multiple messages without cluttering this file with a bunch of html
              return (
                <>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    <img
                      alt="other user pfp"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s"
                      style={{
                        width: '50px',
                        aspectRatio: '1 / 1',
                        objectFit: 'cover',
                        borderRadius: '5px',
                        marginRight: '10px',
                      }}
                    />
                    <p
                      style={{
                        backgroundColor: 'white',
                        padding: '10px',
                        borderRadius: '10px',
                      }}
                    >
                      This is a test message from another user
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignSelf: 'end',
                      marginBottom: '10px',
                    }}
                  >
                    <p
                      style={{
                        backgroundColor: 'white',
                        padding: '10px',
                        borderRadius: '10px',
                      }}
                    >
                      This is a test message from the current user
                    </p>
                    <img
                      alt="your pfp"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s"
                      style={{
                        width: '50px',
                        aspectRatio: '1 / 1',
                        objectFit: 'cover',
                        borderRadius: '5px',
                        marginLeft: '10px',
                      }}
                    />
                  </div>
                </>
              )
            })}
          </div>
          <input
            type="text"
            placeholder="Enter message here"
            style={{ width: '90%', padding: '10px 20px', borderRadius: '10px' }}
          />
        </div>
        <div
          style={{
            backgroundColor: 'gray',
            width: '25vw',
            marginLeft: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <h1 style={{ fontWeight: 'bold', fontSize: '2rem' }}>Name</h1>
          <p>This is the bio I guess?</p>
        </div>
      </div>
    </>
  )
}
