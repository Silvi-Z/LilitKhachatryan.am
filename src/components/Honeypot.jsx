// Hidden anti-spam field: real visitors never see or fill it; many bots do.
export default function Honeypot() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}
    >
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  )
}
