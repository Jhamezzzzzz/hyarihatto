

export default function VoiceMetrics() {
  return (
    <div className="grid  gap-2 ">
      {/* <!-- Total Rank --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
         <div className="grid grid-cols-12 items-center">
            <div className="col-span-11">
              <span className="text-2xl text-gray-600 dark:text-gray-400">
                TOTAL
              </span>
              <div>
                <span
                  style={{ fontSize: '11px' }}
                  className="mt-2 text-gray-600 dark:text-white/90"
                >
                  Jumlah catatan yang dibuat oleh Member
                </span>
              </div>
            </div>
            <div className="col-span-1">
              <h4 className="font-bold text-gray-800 text-4xl dark:text-white/90">
                4
              </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
