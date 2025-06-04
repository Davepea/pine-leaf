'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { installmentPayment, purchase } from '@/utils/axiosInstance';
import { toast } from 'sonner';

interface BuyPropertyModalProps {
  property_purchased_id: string;
  propertyAmount: number;
}

const user = JSON.parse(localStorage.getItem('user') || '{}')

const BuyPropertyModal = ({property_purchased_id, propertyAmount}: BuyPropertyModalProps) => {
  const [paymentPlan, setPaymentPlan] = useState<'full' | 'part' | null>(null);
  const [installmentPlan, setInstallmentPlan] = useState<'two' | 'three' | null>(null);

  const formik = useFormik({
    initialValues: {
      user_id: user?.id,
      payment_method: 'paystack',
      amount: propertyAmount,
      units: 1,
      property_purchased_id: property_purchased_id,
      installment_count: '',
      email: user?.email,
    },
    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          installment_count: paymentPlan === 'part' ? (installmentPlan === 'two' ? '2' : '3') : '1',
        };
        const response = paymentPlan === 'full' ? await  purchase(payload) : await installmentPayment(payload);
        // console.log('Submitted:', response.data);
        toast.success(response.data?.message)
      } catch (error:any) {
        console.error('Submission error:', error);
        toast.error(error.response?.data?.message || 'Payment failed. Please try again.')
      }
    },
  });

  const isPayNowDisabled =
    paymentPlan === null || (paymentPlan === 'part' && installmentPlan === null);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-[#2F5318] text-white px-4 py-3 rounded-md">
            Buy Now
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[525px]">
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

            <h3 className="text-2xl font-semibold text-[#2F5318]">Select Payment Plan</h3>

            {/* Payment Plan Selection */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setPaymentPlan('full');
                  setInstallmentPlan(null);
                }}
                className={`px-4 py-3 rounded-md ${
                  paymentPlan === 'full' ? 'bg-[#2F5318] text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Full Payment
              </button>

              <button
                type="button"
                onClick={() => setPaymentPlan('part')}
                className={`px-4 py-3 rounded-md ${
                  paymentPlan === 'part' ? 'bg-[#2F5318] text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Part Payment
              </button>
            </div>

            {/* Installment Options */}
            {paymentPlan === 'part' && (
              <div>
                <h3 className="mb-2">Number of Payments</h3>
                <div className="flex flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => setInstallmentPlan('two')}
                    className={`px-4 py-3 rounded-md ${
                      installmentPlan === 'two' ? 'bg-[#2F5318] text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Two Times Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => setInstallmentPlan('three')}
                    className={`px-4 py-3 rounded-md ${
                      installmentPlan === 'three' ? 'bg-[#2F5318] text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Three Times Payment
                  </button>
                </div>
              </div>
            )}

            {/* Editable Form Fields */}
            <div className="flex flex-col gap-3 mt-4">
              <label className="text-sm text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formik.values.email}
                readOnly
                onChange={formik.handleChange}
                className="border border-gray-300 rounded-md px-4 py-2"
              />

              <label className="text-sm text-gray-700">Amount</label>
              <input
                type="number"
                name="amount"
                value={formik.values.amount * formik.values.units}
                onChange={formik.handleChange}
                readOnly
                className="border border-gray-300 rounded-md px-4 py-2"
              />

              <label className="text-sm text-gray-700">Units</label>
              <input
                type="number"
                name="units"
                value={formik.values.units}
                onChange={formik.handleChange}
                className="border border-gray-300 rounded-md px-4 py-2"
              />
            </div>

            {/* Footer */}
            <DialogFooter className="mt-6 flex justify-between">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="border border-[#2F5318] text-[#2F5318] px-4 py-3 rounded-md"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                className="bg-[#2F5318] text-white px-4 py-3 rounded-md"
                disabled={isPayNowDisabled}
              >
                Pay Now
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BuyPropertyModal;
