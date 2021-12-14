export default function buildMakeTask({ idManager, validator }) {
  return ({
    sid = idManager.generate(),
    executedAt = new Date(),
    summary,
    executedBy,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) => {
    const { isValid, error } = validator({ sid, executedAt, summary, executedBy, createdAt, updatedAt })
    if (!isValid) throw new Error(error)

    return Object.freeze({
      getSid: () => sid,
      getExecutedAt: () => executedAt,
      getSummary: () => summary,
      setSummary: (newSummary) => {
        summary = newSummary
      },
      getExecutedBy: () => executedBy,
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt
    })
  }
}