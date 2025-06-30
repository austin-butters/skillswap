export default function CreateMeeting() {
  return (
    <form>
      <label>
        Meeting Title:
        <input type="text" name="title" />
      </label>

      <label>
        Keep Public?
        <input type="checkbox" name="public" />
      </label>
    </form>
  )
}
