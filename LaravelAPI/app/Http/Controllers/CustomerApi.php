<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Session;
use Illuminate\Support\Facades\DB;
use App\Models\Customer;
use Mail;
use Str;
use Redirect;
use File;
class CustomerApi extends Controller
{
    public function CustomerLogin(Request $request)
    {
        $users = Customer::select()->where('customer_email', $request->customer_email)->get();
        $tmpUser = new Customer();
        
        foreach($users as $user)
        {
            $tmpUser = $user;
        }

        if($tmpUser->customer_status < 1){
             return 2;
        }

        else{
            if($tmpUser->customer_pwd != md5($request->customer_pwd))
            {
                return 0;
            }
            else{
                Customer::select()->where('customer_email', $request->customer_email)->where('customer_pwd', md5($request->customer_pwd))->update(['customer_login_status'=>1]);
                return $tmpUser;
            }
        }
    }

    public function CustomerLogOut(Request $request)
    {
        $user = Customer::select()->where('customer_id', $request->customer_id)->get();
        
        if(count($user) > 0)
        {
            Customer::select()->where('customer_id', $request->customer_id)->update(['customer_login_status'=>0]);
            return 1;
        }
        return 0;
    }
    

    public function CustomerRegister(Request $request)
    {
        $newCustomer = new Customer();
        $newCustomer->customer_name =  $request->customer_name;
        $newCustomer->customer_email = $request->customer_email;
        $newCustomer->customer_pwd = md5($request->customer_pwd);
        $newCustomer->customer_contact = $request->customer_contact;
        $newCustomer->customer_token = strtoupper(Str::random(10));
        // $newCustomer->customer_ip = $request->customer_ip;

        $isExist = Customer::select()->where('customer_email',  $newCustomer->customer_email)->exists();

        if(!$isExist)
        {
            $newCustomer->save();
            Mail::send('emailValidateEmail', compact('newCustomer'), function($email) use($newCustomer){
                $email->subject('VNHP Aution - Verify account');
                $email->to($newCustomer->customer_email, $newCustomer->customer_name);
            });
            return 1;
        }
       
        return 0;
    }

    public function IsEmailExists(Request $request)
    {
        $isExist = Customer::where('customer_email', $request->customer_email)->exists();
       
        if($isExist)
            return 1;
        return 0;
    }

    public function CustomerUpdateInfo(Request $request)
    {
        $customer = Customer::select()->where('customer_email',$request->customer_email)->get();

        if(count($customer) > 0)
        {
            Customer::select()->where('customer_email',$request->customer_email)
                                            ->update(['customer_name'=>$request->customer_name,
                                                    'customer_address'=>$request->customer_address,
                                                    'customer_contact'=>$request->customer_contact,
                                                    'customer_dob'=>$request->customer_dob,
                                                    'customer_img_name'=>$request->customer_img_name]);
            $tmpCustomer = Customer::select()->where('customer_email',$request->customer_email)->get();

            $tmp = new Customer();
            foreach($tmpCustomer as $cus)
            {
                $tmp = $cus;
            }
            return $tmp;
        }

        return 0;
    }

    public function CustomerActivedEmail($customer_id, $customer_token){
        $tmpCustomer = Customer::select()->where('customer_id',$customer_id)->where('customer_token',$customer_token)->update(['customer_status'=>1]);
        
        if($tmpCustomer > 0)
        {
            $url = "http://localhost:3000/login";
            return Redirect::intended($url);
        }
    }

    public function CustomerInfo()
    {
        return Customer::select()->get();
    }

    public function CustomerChangeAvatar(Request $request)
    {
        $customer = Customer::select()->where('customer_email',$request->customer_email)->get();
        $tmp = new Customer();

        if(count($customer) > 0)
        {
            foreach($customer as $cus)
            {
                $tmp = $cus;
            }
            if($tmp->customer_img_name != 'default_account_image.jpg')
            {
                File::delete(public_path('UserImage/'.$tmp->customer_img_name));
            }

            Customer::select()->where('customer_email',$request->customer_email)
                                            ->update(['customer_name'=>$request->customer_name,
                                            'customer_address'=>$request->customer_address,
                                            'customer_contact'=>$request->customer_contact,
                                            'customer_dob'=>$request->customer_dob,
                                            'customer_img_name'=>time().'-'.'user'.$request->img_extension]);
            $customer_avatar = $request->file('user_avatar_image');
            $customer_avatar->move(public_path('UserImage'), time().'-'.'user'.$request->img_extension);
            $tmpCustomer = Customer::select()->where('customer_email',$request->customer_email)->get();

            foreach($tmpCustomer as $cus)
            {
                $tmp = $cus;
            }
            return $tmp;
        }

        return 0;
    }

    public function CustomerChangePassword(Request $request)
    {
        $customer = Customer::select()->where('customer_email',$request->customer_email)->where('customer_pwd',md5($request->customer_pwd))->get();

        $tmp = new Customer();
        foreach($customer as $cus)
        {
            $tmp = $cus;
        }

        if(count($customer) > 0)
        {
            Customer::select()->where('customer_email',$tmp->customer_email)
                                            ->update(['customer_name'=>$tmp->customer_name,
                                                    'customer_address'=>$tmp->customer_address,
                                                    'customer_pwd'=>md5($request->new_password),
                                                    'customer_contact'=>$tmp->customer_contact,
                                                    'customer_dob'=>$tmp->customer_dob,
                                                    'customer_img_name'=>$tmp->customer_img_name]);
            $tmpCustomer = Customer::select()->where('customer_email',$tmp->customer_email)->get();

            foreach($tmpCustomer as $cus)
            {
                $tmp = $cus;
            }
            return $tmp;
        }
        return 0;
    }

    public function CustomerCheckPassword(Request $request)
    {
        $customer = Customer::select()->where('customer_email',$request->customer_email)->where('customer_pwd',md5($request->customer_pwd))->get();

        if(count($customer) > 0)
        {
            return 1;
            
        }
        return 0;
    }

    public function CustomerForgetPassword(Request $request)
    {
        $currentCustomer = Customer::select()->where('customer_email',$request->customer_email)->get();

        $tmp = new Customer();
        foreach($currentCustomer as $cus)
        {
            $tmp = $cus;
        }

        if(count($currentCustomer) > 0)
        {
            $newPassword = strtoupper(Str::random(10));
            Customer::select()->where('customer_email',$tmp->customer_email)
                                            ->update(['customer_name'=>$tmp->customer_name,
                                                    'customer_address'=>$tmp->customer_address,
                                                    'customer_pwd'=>md5($newPassword),
                                                    'customer_contact'=>$tmp->customer_contact,
                                                    'customer_dob'=>$tmp->customer_dob,
                                                    'customer_img_name'=>$tmp->customer_img_name]);

            $customer = Customer::select()->where('customer_email',$tmp->customer_email)->first();
            $customer->customer_pwd = $newPassword;
            Mail::send('emailForgetPassword', compact('customer'), function($email) use($customer){
                $email->subject('VNHP Aution - Reset password');
                $email->to($customer->customer_email, $customer->customer_name,$customer->customer_pwd);
            });
            return 1;
        }
        return 0;
    }

    public function CustomerForgetPasswordView(){
        return view('emailForgetPassword');
    }

    public function CustomerAutionHistory(){
        return DB::select("select ca.customer_id,p.product_name,ap.aution_price,ap.aution_day
            from customer_account ca
            join aution_price ap on (ca.customer_id = ap.customer_id)
            join product p on (ap.product_id = p.product_id)
            order by ap.aution_day");
    }

    public function CustomerBillHistory(){
        return DB::select("select ca.customer_id,b.bill_id,pm.payment_mode_id,b.bill_payment,pm.payment_mode_type,p.product_name,b.bill_date 
        from bill b
        join product p on (p.product_id = b.product_id)
        join payment_mode pm on (b.payment_mode_id = pm.payment_mode_id)
        join customer_account ca on (b.customer_id = ca.customer_id)
        where b.bill_status = 1
        order by b.bill_date");
    }

    public function CustomerNewBill(){
        return DB::select("select ca.customer_id,b.bill_id,pm.payment_mode_id,b.bill_payment,pm.payment_mode_type,p.product_name,b.bill_date 
        from bill b
        join product p on (p.product_id = b.product_id)
        join payment_mode pm on (b.payment_mode_id = pm.payment_mode_id)
        join customer_account ca on (b.customer_id = ca.customer_id)
        where b.bill_status = 0
        order by b.bill_date");
    }
}
