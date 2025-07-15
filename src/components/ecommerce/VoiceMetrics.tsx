

export default function VoiceMetrics() {
  return (
    <div className="grid  gap-2 ">
      {/* <!-- Total Rank --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <span className="text-title-sm text-gray-500 dark:text-gray-400">
              TOTAL
        </span>
        <div className="flex items-end justify-between mt-5">
          <div>
              <span className="mt-2  text-gray-600 text-sm dark:text-white/90">
              Jumlah catatan yang dibuat oleh Member
              </span>
            <h4 className="mt-2 font-bold text-gray-800 text-xl  dark:text-white/90">
             4
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
