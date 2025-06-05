const OrderStatusIndicator = ({ orderStatus }) => {
  if (!orderStatus) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "starting":
      case "validating":
      case "calculating":
      case "checking":
      case "creating":
      case "processing":
      case "clearing":
      case "finalizing":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "error":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5 animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={`fixed top-20 right-4 z-50 ${getStatusColor(
        orderStatus.status
      )} text-white px-6 py-3 rounded-lg shadow-lg max-w-sm`}
    >
      <div className="flex items-center gap-3">
        {getStatusIcon(orderStatus.status)}
        <span className="font-medium">{orderStatus.message}</span>
      </div>
    </div>
  );
};

export default OrderStatusIndicator;
